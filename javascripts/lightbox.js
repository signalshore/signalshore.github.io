/*
 * Site Lightbox - "click to focus" photo viewer for blog images.
 *
 * Mirrors the behavior found on kashyapsuhas.com (see GAMEPLAN.md):
 * click any image in a post -> fullscreen overlay gallery of ALL images on
 * that page. Navigate with arrows / swipe / keyboard.
 *
 * Built as a plain IIFE (Immediately Invoked Function Expression) so none of
 * its internal variables leak into the global scope. It needs no framework —
 * everything is vanilla DOM APIs.
 */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ *
   * Module-level state (shared across all functions below).
   * ------------------------------------------------------------------ */

  // The overlay <div> currently on screen, or null when closed.
  var overlay = null;

  // The gallery: array of <img> elements that exist on the current page,
  // in reading order. Rebuilt from scratch every time the lightbox opens.
  var photos = [];

  // Index of the photo currently shown in the overlay (into `photos`).
  var index = 0;

  // The thumbnail <img> the user clicked. We remember it so that when the
  // overlay closes we can hand keyboard focus back to it (a11y nicety).
  var lastTrigger = null;

  // X/Y of the touch that started a swipe (for mobile prev/next). null when
  // not touching.
  var touchStart = null;

  /* ------------------------------------------------------------------ *
   * contentImages()
   * Returns every <img> inside the article body that mkdocs-material renders
   * (.md-content__inner is the container mkdocs-material wraps post content
   * in). Used both to attach click handlers and to build the gallery.
   * ------------------------------------------------------------------ */
  function contentImages() {
    var root = document.querySelector(".md-content__inner");
    return root
      ? Array.prototype.slice.call(root.querySelectorAll("img"))
      : [];
    // querySelectorAll returns a "NodeList" (array-like, no .forEach that we
    // can freely mutate with). slice.call converts it into a real Array.
  }

  /* ------------------------------------------------------------------ *
   * bindImages()
   * Attaches the "open the lightbox" click handler to every content image.
   * Safe to call repeatedly: each img is tagged (data-lb-bound) so it only
   * gets one handler even if this runs again.
   * ------------------------------------------------------------------ */
  function bindImages() {
    var imgs = contentImages();
    imgs.forEach(function (img) {
      // Skip images inside a link (`[![img](x)](url)`) — clicking those should
      // follow the link, not open the viewer. Also skip anything rendered by
      // a previous lightbox overlay.
      if (img.closest("a") || img.closest(".lb-overlay")) return;
      // Skip images we've already bound on this page (idempotency guard).
      if (img.dataset.lbBound) return;
      img.dataset.lbBound = "true";           // mark as handled
      img.classList.add("lb-img");            // gives it a zoom-in cursor (CSS)
      img.addEventListener("click", function () {
        openAround(img);                      // open gallery centered on this img
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * openAround(img)
   * Called when a thumbnail is clicked. Rebuilds the gallery from the
   * CURRENT page content, finds the clicked image's position in it, creates
   * the overlay (if needed), and shows that image.
   * ------------------------------------------------------------------ */
  function openAround(img) {
    photos = contentImages().filter(function (i) {
      return !i.closest("a") && !i.closest(".lb-overlay");
    });
    var i = photos.indexOf(img);              // index of the clicked image
    if (i === -1) return;                     // clicked img not in gallery?
    lastTrigger = img;                        // remember for focus restore
    createOverlay();                          // build UI once
    show(i);                                  // render the clicked photo
  }

  /* ------------------------------------------------------------------ *
   * createOverlay()
   * Builds the overlay DOM the first time it's opened and appends it to
   * <body>. Subsequent opens reuse it. Structure:
   *
   *   .lb-overlay            (fixed, full-screen, above everything)
   *   ├── .lb-backdrop       (dark click-to-close layer)
   *   └── .lb-stage          (centered column: image, caption+counter, controls)
   *       ├── .lb-img-full
   *       ├── .lb-meta  -> .lb-caption + .lb-counter
   *       └── .lb-controls -> prev / next / close buttons
   * ------------------------------------------------------------------ */
  function createOverlay() {
    if (overlay) return;                      // already built? bail out

    overlay = document.createElement("div");
    overlay.className = "lb-overlay";
    // A11y: tell screen readers this is a modal dialog and focus it.
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Photo viewer");
    overlay.tabIndex = -1;                    // makes the div programmatically-focusable

    // Backdrop: the dimming layer. Clicking it closes the viewer.
    var backdrop = document.createElement("div");
    backdrop.className = "lb-backdrop";
    backdrop.addEventListener("click", close);

    // Stage: a centered flex column. Also detects horizontal swipe gestures.
    var stage = document.createElement("div");
    stage.className = "lb-stage";
    stage.addEventListener("touchstart", function (e) {
      // Record where the finger went down.
      touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });
    stage.addEventListener("touchend", function (e) {
      if (!touchStart) return;
      // Work out how far (and in which direction) the finger moved.
      var dx = e.changedTouches[0].clientX - touchStart.x;
      var dy = e.changedTouches[0].clientY - touchStart.y;
      touchStart = null;
      // Treat it as a swipe only if horizontal AND larger than 48px AND more
      // horizontal than vertical (so vertical scrolling isn't hijacked).
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
        dx > 0 ? navigate(-1) : navigate(1);  // right->left = next, left->right = prev
      }
    });

    // The big full-resolution image shown in the overlay.
    var img = document.createElement("img");
    img.className = "lb-img-full";
    img.draggable = false;                    // don't let the browser natively drag it

    // Meta row: caption on top, "N / total" counter underneath.
    var meta = document.createElement("div");
    meta.className = "lb-meta";

    var caption = document.createElement("p");
    caption.className = "lb-caption";

    var counter = document.createElement("span");
    counter.className = "lb-counter";

    meta.appendChild(caption);
    meta.appendChild(counter);

    // Controls: prev / next / close buttons.
    var controls = document.createElement("div");
    controls.className = "lb-controls";

    var prev = mkButton("lb-prev", "←", "previous photo", function () {
      navigate(-1);
    });
    var next = mkButton("lb-next", "→", "next photo", function () {
      navigate(1);
    });
    var closeBtn = mkButton("lb-close", "✕", "close", close);

    controls.appendChild(prev);
    controls.appendChild(next);
    controls.appendChild(closeBtn);

    // Assemble: stage holds image + meta + controls; overlay holds backdrop + stage.
    stage.appendChild(img);
    stage.appendChild(meta);
    stage.appendChild(controls);
    overlay.appendChild(backdrop);
    overlay.appendChild(stage);

    // Put the overlay on the page and remember it's open.
    document.body.appendChild(overlay);
    document.documentElement.classList.add("lb-open"); // CSS locks page scroll
    overlay.focus();                          // move keyboard focus into the dialog

    // Keyboard navigation works the whole time the overlay is open.
    window.addEventListener("keydown", onKey);
  }

  /* ------------------------------------------------------------------ *
   * mkButton(className, label, title, onClick)
   * Tiny helper that creates a <button>, sets its text and aria-label, wires
   * up its click handler, and returns it. Keeps createOverlay() readable.
   * ------------------------------------------------------------------ */
  function mkButton(className, label, title, onClick) {
    var btn = document.createElement("button");
    btn.type = "button";                      // don't submit any form
    btn.className = className;
    btn.textContent = label;                  // the ‹ › ✕ glyph
    btn.title = title;                        // native hover tooltip
    btn.setAttribute("aria-label", title);    // screen-reader equivalent of title
    btn.addEventListener("click", onClick);
    return btn;
  }

  /* ------------------------------------------------------------------ *
   * photoData(el)
   * Reads the caption and full-size source for a content <img>.
   * Caption wins from: wrapping <figure>'s <figcaption> (if any), else the
   * img's `title` attr, else its `alt` attr. src = currentSrc || src
   * (currentSrc is the actually-loaded candidate, e.g. from srcset).
   * ------------------------------------------------------------------ */
  function photoData(el) {
    var fig = el.closest("figure");
    var figCap = fig && fig.querySelector("figcaption");
    var caption = figCap ? figCap.textContent : el.title || el.alt || "";
    return { src: el.currentSrc || el.src, caption: caption };
  }

  /* ------------------------------------------------------------------ *
   * show(i)
   * Renders photo at index `i` into the overlay. `i` is wrapped modulo the
   * gallery length so navigating off either end wraps around.
   * Also preloads the neighbours so the next/prev feel instant.
   * ------------------------------------------------------------------ */
  function show(i) {
    index = (i + photos.length) % photos.length; // wrap negative/overflow indices
    var p = photoData(photos[index]);

    // Swap the src/alt on the existing <img> the overlay created.
    var img = overlay.querySelector(".lb-img-full");
    img.src = p.src;
    img.alt = p.caption;

    // Update caption and "N / total" counter.
    overlay.querySelector(".lb-caption").textContent = p.caption;
    overlay.querySelector(".lb-counter").textContent =
      (index + 1) + " / " + photos.length;

    // Single photo? prev/next are pointless -> disable them.
    overlay.querySelector(".lb-prev").disabled = photos.length <= 1;
    overlay.querySelector(".lb-next").disabled = photos.length <= 1;

    // Warm up the images either side of the current one.
    var left = photos[(index - 1 + photos.length) % photos.length];
    var right = photos[(index + 1) % photos.length];
    preload(left);
    preload(right);
  }

  /* ------------------------------------------------------------------ *
   * preload(img)
   * Kicks off a hidden download of the given image so the browser already
   * has it cached by the time the user navigates to it. (The `img` param
   * shadows the module's `overlay img` notion — it's just a name.)
   * ------------------------------------------------------------------ */
  function preload(img) {
    if (!img) return;
    var i = new Image();                      // an off-DOM Image object
    i.src = img.currentSrc || img.src;        // assigning src starts the fetch
  }

  /* ------------------------------------------------------------------ *
   * navigate(delta)
   * Move the viewer forwards (+1) or backwards (-1) photos.
   * ------------------------------------------------------------------ */
  function navigate(delta) {
    if (!overlay || photos.length === 0) return; // nothing open, nothing to do
    show(index + delta);
  }

  /* ------------------------------------------------------------------ *
   * onKey(e)
   * Global key handler registered only while the overlay is open.
   * Left/right arrow = prev/next, Escape = close.
   * ------------------------------------------------------------------ */
  function onKey(e) {
    if (e.key === "ArrowLeft") navigate(-1);
    else if (e.key === "ArrowRight") navigate(1);
    else if (e.key === "Escape") close();
  }

  /* ------------------------------------------------------------------ *
   * close()
   * Tears the overlay down: removes the key listener, un-locks page scroll,
   * removes the DOM, clears the gallery, and returns focus to the thumbnail
   * that opened the viewer.
   * ------------------------------------------------------------------ */
  function close() {
    if (!overlay) return;                     // already closed
    window.removeEventListener("keydown", onKey);
    document.documentElement.classList.remove("lb-open"); // re-enable scroll
    overlay.parentNode.removeChild(overlay);  // delete the overlay node
    overlay = null;                           // mark as closed
    photos = [];                              // drop the gallery snapshot
    if (lastTrigger) {
      var t = lastTrigger;                    // the thumbnail we came from
      lastTrigger = null;
      t.focus();                              // put keyboard focus back there
    }
  }

  /* ------------------------------------------------------------------ *
   * start()
   * Entry point. mkdocs-material ships an RxJS-style observable called
   * `document$` that emits every time the page's content is (re)rendered —
   * including on Instant-navigation page switches (the `navigation.instant`
   * feature fetches the next page via XHR and swaps it in without a real
   * reload, so DOMContentLoaded does NOT fire on navigation).
   *
   * Every time it fires, we close any stale overlay and rebind the click
   * handlers to the newly-injected images. If `document$` isn't available
   * (e.g. the script is loaded somewhere unusual), fall back to binding once.
   * ------------------------------------------------------------------ */
  function start() {
    if (typeof document$ !== "undefined" && document$.subscribe) {
      document$.subscribe(function () {
        close();     // if the overlay is open while navigating, dispose of it
        bindImages(); // attach handlers to the (possibly new) page's images
      });
    } else {
      bindImages();
    }
  }

  // Fire start() as soon as the DOM is parseable. If the script is deferred
  // (loaded after parsing, which is how we register it in mkdocs.yaml), the
  // readyState won't be "loading" and start() runs immediately.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
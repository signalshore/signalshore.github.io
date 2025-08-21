window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  startup: {
    typeset: true
  },
  chtml: {
    scale: 1,
    minScale: 0.5,
    matchFontHeight: false,
    fontURL: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2"
  }
};

document$.subscribe(() => { 
  if (typeof MathJax !== "undefined") {
    MathJax.typesetPromise()
  }
})
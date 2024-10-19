#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = "Sohom"
SITENAME = "SignalShore"
SITEURL = ""
RELATIVE_URLS = True

PATH = "content"
STATIC_PATHS = ["assets"]
STATIC_SAVE_AS = "blog/{path}"

TIMEZONE = "Asia/Kolkata"

DEFAULT_LANG = "en"

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = "feeds/all.atom"

# Links
LINKS = (("Archives", "/archives/"), ("Tag", "/tag/"), ("Now", "/tag/now.html"))

MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.toc": {},
        "markdown.extensions.codehilite": {"css_class": "highlight"},
        "markdown.extensions.extra": {},
        "markdown.extensions.meta": {},
    },
    "output_format": "html5",
}
# Pagination
DEFAULT_PAGINATION = 10

# Plugins
PLUGINS = ["render_math"]
PLUGIN_PATHS = ["plugins", "/home/sohom/wkspc/personal/blog/pelican/pelican-plugins"]

# Themes
# I am using the AboutWilson theme
THEME = "/home/sohom/wkspc/personal/blog/signalshore.github.io/theme/"

LOAD_CONTENT_CACHE = False

# URL settings
AUTHORS_SAVE_AS = ""
CATEGORIES_SAVE_AS = ""
AUTHOR_SAVE_AS = ""
CATEGORY_SAVE_AS = ""

ARTICLE_URL = "blog/{path_no_ext}.html"
ARTICLE_SAVE_AS = "blog/{path_no_ext}.html"

# YEAR_ARCHIVE_SAVE_AS = 'posts/{date:%Y}/index.html'
# MONTH_ARCHIVE_SAVE_AS = 'posts/{date:%Y}/{date:%b}/index.html'

PAGE_URL = "{slug}/"
PAGE_SAVE_AS = "{slug}/index.html"

TAGS_SAVE_AS = "tag/index.html"
ARCHIVES_SAVE_AS = "archives/index.html"

# Metadata regex
FILENAME_METADATA = "(?P<date>\d{4}-\d{2}-\d{2})-(?P<slug>.*)"

PATH_METADATA = "(?P<path_no_ext>.*)\..*"

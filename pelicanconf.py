#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Sohom'
SITENAME = 'SignalShore'
SITEURL = ''

PATH = 'content'
STATIC_PATHS = ['assets']

TIMEZONE = 'Asia/Kolkata'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = 'feeds/all.atom'

# Social widget
SOCIAL = (('Twitter', 'https://twitter.com/sohom83'),
          ('Github', 'https://github.com/83bytes'),
          ('Gitlab', 'https://gitlab.com/83bytes'))

# Pagination
DEFAULT_PAGINATION = 10

# Plugins
PLUGINS = ["render_math"]
PLUGIN_PATHS = ["plugins", "/mnt/data/work_space/blog/pelican/pelican-plugins"]

# Themes
THEME = '/mnt/data/work_space/blog/signalshore.github.io/theme/'

LOAD_CONTENT_CACHE = False


# URL settings
AUTHORS_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''

AUTHOR_SAVE_AS = ''
CATEGORY_SAVE_AS = ''

ARTICLE_URL = 'blog/{slug}.html'
ARTICLE_SAVE_AS='blog/{slug}.html'
PAGE_URL = '{slug}.html'
PAGE_SAVE_AS='{slug}.html'


# Metadata regex
FILENAME_METADATA = '(?P<date>\d{4}-\d{2}-\d{2})-(?P<slug>.*)'

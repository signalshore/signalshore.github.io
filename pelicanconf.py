#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Sohom'
SITENAME = 'SignalShore'
SITEURL = ''
RELATIVE_URLS = False



PATH = 'content'
STATIC_PATHS = ['assets']

TIMEZONE = 'Asia/Kolkata'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = 'feeds/all.atom'


# Links
LINKS = (('Archives', '/archives.html'),
         ('Tags', '/tag/index.html'))


# Pagination
DEFAULT_PAGINATION = 10

# Plugins
PLUGINS = ["render_math", "org_reader"]
PLUGIN_PATHS = ["plugins", "/mnt/data/work_space/blog/pelican/pelican-plugins"]

# Themes
# I am using the AboutWilson theme
THEME = '/mnt/data/work_space/blog/signalshore.github.io/theme/'

LOAD_CONTENT_CACHE = False
ORG_READER_EMACS_LOCATION = '/usr/bin/emacs'

# URL settings
AUTHORS_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''
AUTHOR_SAVE_AS = ''
CATEGORY_SAVE_AS = ''


ARTICLE_URL = 'blog/{slug}.html'
ARTICLE_SAVE_AS='blog/{slug}.html'
PAGE_URL = '{slug}.html'
PAGE_SAVE_AS='{slug}.html'
TAGS_SAVE_AS = 'tag/index.html'

# Metadata regex
FILENAME_METADATA = '(?P<date>\d{4}-\d{2}-\d{2})-(?P<slug>.*)'

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
# FEED_ALL_ATOM = '/feeds/all.atom.xml'
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None


# Social widget
SOCIAL = (('Twitter', 'https://twitter.com/sohom154')  ,
          ('Github', 'https://github.com/83bytes') ,
          ('Gitlab', 'https://gitlab.com/83bytes') )

DEFAULT_PAGINATION = 10

PLUGINS = ["render_math"]
PLUGIN_PATHS = ["plugins", "/mnt/data/work_space/blog/pelican/pelican-plugins"]

LOAD_CONTENT_CACHE = False


# URL settings
AUTHOR_SAVE_AS = ''
CATEGORY_SAVE_AS = ''
ARTICLE_URL = 'blog/{slug}.html'
ARTICLE_SAVE_AS='blog/{slug}.html'
PAGE_URL = '{slug}.html'
PAGE_SAVE_AS='{slug}.html'

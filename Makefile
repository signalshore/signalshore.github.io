PY?=python3
PELICAN?=pelican
PELICANOPTS=

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/output
CONFFILE=$(BASEDIR)/pelicanconf.py
PUBLISHCONF=$(BASEDIR)/publishconf.py

NOTESDIR=/home/sohom/wkspc/personal/Notes
GITHUB_PAGES_BRANCH=master


DEBUG ?= 0
ifeq ($(DEBUG), 1)
	PELICANOPTS += -D
endif

RELATIVE ?= 0
ifeq ($(RELATIVE), 1)
	PELICANOPTS += --relative-urls
endif

SERVER ?= "0.0.0.0"

PORT ?= 0
ifneq ($(PORT), 0)
	PELICANOPTS += -p $(PORT)
endif


help:
	@echo 'Makefile for a pelican Web site                                           '
	@echo '                                                                          '
	@echo 'Usage:                                                                    '
	@echo '   make html                           (re)generate the web site          '
	@echo '   make clean                          remove the generated files         '
	@echo '   make regenerate                     regenerate files upon modification '
	@echo '   make publish                        generate using production settings '
	@echo '   make serve [PORT=8000]              serve site at http://localhost:8000'
	@echo '   make serve-global [SERVER=0.0.0.0]  serve (as root) to $(SERVER):80    '
	@echo '   make devserver [PORT=8000]          serve and regenerate together      '
	@echo '   make devserver-global               regenerate and serve on 0.0.0.0    '
	@echo '   make github                         upload the web site via gh-pages   '
	@echo '                                                                          '
	@echo 'Set the DEBUG variable to 1 to enable debugging, e.g. make DEBUG=1 html   '
	@echo 'Set the RELATIVE variable to 1 to enable relative urls                    '
	@echo '                                                                          '

# todo: find a better way of doing this
links:
	ln -s -r -f "$(NOTESDIR)/assets" ./content/
	ln -s -r -f "$(NOTESDIR)/2023-06-29-Anti-Blog.md" ./content/
	ln -s -r -f "$(NOTESDIR)/my-values.md" ./content/pages/
	ln -s -r -f "$(NOTESDIR)/2023-10-22-First-car-accident.md" ./content/
	ln -s -r -f "$(NOTESDIR)/2023-11-14-Konkan-Bike-Tour.md" ./content/
	#ln -s -r -f "$(NOTESDIR)/2023-12-01-First-motorbike-accident.md" ./content/



clean:
	[ ! -d "$(OUTPUTDIR)" ] || rm -rf "$(OUTPUTDIR)"

serve:
	"$(PELICAN)" -l "$(INPUTDIR)" -o "$(OUTPUTDIR)" -s "$(CONFFILE)" $(PELICANOPTS)

devserver: links scrubimage
	"$(PELICAN)" -lr "$(INPUTDIR)" -o "$(OUTPUTDIR)" -s "$(CONFFILE)" $(PELICANOPTS)

publish: links scrubimage
	"$(PELICAN)" "$(INPUTDIR)" -o "$(OUTPUTDIR)" -s "$(PUBLISHCONF)" $(PELICANOPTS)

github: publish
	ghp-import -m "Generate Pelican site" -b $(GITHUB_PAGES_BRANCH) "$(OUTPUTDIR)"
	git push origin blog:blog master:master

scrubimage:
	exiftool -All= -TagsFromFile @ -ColorSpaceTags -OverWrite_Original -r "$(NOTESDIR)/assets/"

.PHONY: html help clean regenerate serve serve-global devserver publish github

SUBDIRS := $(wildcard *)
HTML := $(wildcard *.html)

all:
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ] && [ -e $$dir/Makefile ]; then $(MAKE) -C $$dir"/."; fi done

init:
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ] && [ -e $$dir/Makefile ]; then $(MAKE) -C $$dir"/." init; fi done

clean:
	for file in $(HTML); do $(RM) $$file; done
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ] && [ -e $$dir/Makefile ]; then $(MAKE) -C $$dir clean; fi done

.PHONY: all run stop clean init

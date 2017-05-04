SUBDIRS := $(wildcard *)

all:
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ] && [ -e $$dir/Makefile ]; then $(MAKE) -C $$dir"/."; fi done

init:
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ] && [ -e $$dir/Makefile ]; then $(MAKE) -C $$dir"/." init; fi done

run:
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ] && [ -e $$dir/Makefile ]; then $(MAKE) -C $$dir run; fi done

stop:
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ] && [ -e $$dir/Makefile ]; then $(MAKE) -C $$dir stop; fi done

clean:
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ] && [ -e $$dir/Makefile ]; then $(MAKE) -C $$dir clean; fi done

.PHONY: all run stop clean init

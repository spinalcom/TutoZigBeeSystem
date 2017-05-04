FILE_BUILD_ORDER:=build.order
SUBDIRS :=`cat $(FILE_BUILD_ORDER)`

all: install global

install: build-order
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ] && [ -e $$dir/Makefile ]; then $(MAKE) -C $$dir"/."; fi done

global: global-is-sim global-models global-processes

global-models: build-order
	echo "" > all.models.js;
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ] && [ -e $$dir/models.js ]; then cat $$dir/models.js >> all.models.js; fi done

global-processes: build-order
	echo "" > all.processes.js;
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ] && [ -e $$dir/processes.js ]; then cat $$dir/processes.js >> all.processes.js; fi done

global-is-sim: build-order
	echo "" > all.is-sim.js
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ]; then if [ -e $$dir/is-sim.js ]; then cat $$dir/is-sim.js >> all.is-sim.js; else if [ -e $$dir/models.js ]; then cat $$dir/models.js >> all.is-sim.js; fi; if [ -e $$dir/processes.js ]; then cat $$dir/processes.js >> all.is-sim.js; fi fi fi done

clean:
	rm -f all.processes.js all.models.js;
	for dir in $(SUBDIRS); do if [ ! -L $$dir ] && [ -d $$dir ]; then $(MAKE) -C $$dir clean; fi done

build-order:
	echo "Creating build.order file"
	@! test -e "spinal_build_order.js" || nodejs spinal_build_order.js


.PHONY: install global global-processes global-models clean build-order


all:

update:
	npm install spinalcore

run:
	nodejs index.js &

stop:
	kill -9 $$( pgrep -f "nodejs index.js" )

.PHONY: all update run stop



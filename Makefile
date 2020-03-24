.PHONY: all
all: clean install db

.PHONY: db
database:
	node initialise_database.js

.PHONY: install
install: clean
	npm i

.PHONY: clean
clean:
	rm -rf node_modules/
	rm -f data/questionnaire.sqlite

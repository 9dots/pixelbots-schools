#
# Vars
#

BIN = ./node_modules/.bin
.DEFAULT_GOAL := all

#
# Tasks
#

node_modules: package.json
	@npm install
	@touch node_modules

# Fix this at some point
test: $(src) $(tests) node_modules
	@NODE_ENV=development hihat src/components/RoundedInput/RoundedInput.test.js -- \
		--debug \
		-t babelify \
		-p tap-dev-tool

dev:
	@${BIN}/unv dev

build:
	@${BIN}/unv build --base a.weo.io

validate: node_modules
	@standard

deploy-assets:
	aws s3 sync assets s3://a.weo.io --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
	aws s3 sync assets s3://builds.weo.io/`git rev-parse HEAD`

all: validate test

#
# Phony
#

.PHONY: test validate clean build deploy-assets

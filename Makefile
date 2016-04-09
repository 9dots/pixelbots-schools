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

test: node_modules
	babel test/*.js

validate: node_modules
	@standard

deploy-assets:
	aws s3 sync build s3://assets.weo.io
	aws s3 cp --recursive build s3://builds.weo.io/`git rev-parse HEAD`

all: validate test

#
# Phony
#

.PHONY: test validate clean build deploy-assets

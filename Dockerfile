FROM tutum/buildstep
RUN export NODE_ENV=$SOURCE_BRANCH && cd app && .heroku/node/bin/node node_modules/.bin/unv build
CMD ["./node_modules/.bin/unv", "serve"]


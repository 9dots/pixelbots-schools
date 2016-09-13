FROM tutum/buildstep
RUN cd app && .heroku/node/bin/node node_modules/.bin/unv build
CMD ["./node_modules/.bin/unv", "serve"]


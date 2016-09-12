FROM tutum/buildstep
RUN app/.heroku/node/bin/node app/node_modules/.bin/unv build
CMD ["./node_modules/.bin/unv", "server.js"]

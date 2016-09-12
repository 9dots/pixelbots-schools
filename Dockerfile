FROM tutum/buildstep
RUN node app/node_modules/.bin/unv build
CMD ["./node_modules/.bin/unv", "server.js"]

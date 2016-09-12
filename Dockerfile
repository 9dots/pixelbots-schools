FROM tutum/buildstep
RUN ./node_modules/.bin/unv build
CMD ["./node_modules/.bin/unv", "server.js"]

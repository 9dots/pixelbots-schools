FROM tutum/buildstep
RUN ls -la
RUN ls -la node_modules
RUN ls -la node_modules/.bin
RUN ./node_modules/.bin/unv build
CMD ["./node_modules/.bin/unv", "server.js"]

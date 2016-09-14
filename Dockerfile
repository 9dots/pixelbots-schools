FROM tutum/buildstep
RUN echo $SOURCE_BRANCH
RUN export NODE_ENV=$SOURCE_BRANCH
RUN cd app && .heroku/node/bin/node node_modules/.bin/unv build
CMD ["./node_modules/.bin/unv", "serve"]


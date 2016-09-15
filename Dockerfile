FROM tutum/buildstep
RUN cd app
RUN export NODE_ENV=`git symbolic-ref --short -q HEAD`
RUN .heroku/node/bin/node node_modules/.bin/unv build
CMD ["./node_modules/.bin/unv", "serve"]


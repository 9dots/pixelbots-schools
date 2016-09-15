FROM tutum/buildstep
RUN cd app && export NODE_ENV=`git symbolic-ref --short -q HEAD` && .heroku/node/bin/node node_modules/.bin/unv build
CMD ["./node_modules/.bin/unv", "serve"]


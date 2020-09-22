FROM node:10-alpine

# install dependencies
COPY . /usr/src
WORKDIR /usr/src
RUN yarn --ignore-scripts

# start server
WORKDIR ./apollos-church-api
RUN yarn build
EXPOSE 4000
CMD [ "yarn", "start:prod" ]

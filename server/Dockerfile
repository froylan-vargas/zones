FROM node:alpine
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /ts/app && cp -a /tmp/node_modules /ts/app/
# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /ts/app
ADD . /ts/app
RUN npm run build
CMD ["node","build/index.js"]
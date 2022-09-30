FROM node:14.18.1-alpine as base64

# FROM base as bluebird

# dependencies for post-installl scripts

# RUN apk add 

RUN apt-get install -y python make git g++

# RUN apt-get -yq update && \
#      apt-get -yqq install ssh

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

# FROM base 

WORKDIR /usr/src/app

# COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY . .

RUN NODE_ENV=production npm run build

EXPOSE 30124


# START THE APPLICATION

CMD [ "npm", "start" ] 

# TRIGGER BUILD
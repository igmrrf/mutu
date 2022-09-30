FROM node:lts

WORKDIR /usr/src/app
# dependencies for post-installl scripts

# RUN apk add --update --no-cache python make git g++

RUN apt-get install -y gnupg make git g++ python3 
# -is-python3

RUN apt-get -yq update && \
     apt-get -yqq install ssh

COPY  ./node_modules /usr/src/app/node_modules

COPY package*.json ./

RUN npm install

COPY . .

RUN NODE_ENV=production npm run build

EXPOSE 30124


# START THE APPLICATION

CMD [ "npm", "start" ] 

# TRIGGER BUILD










# TRIGGER BUILD
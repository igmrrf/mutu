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
ENV CLIENT_ID=J9F8FH4OAJF4OAFDLKFAJLDF
ENV CLIENT_SECRET=ALDFJAKLDFJALKDJFALJD
ENV REDIRECT_URL=https://igmrrf.com
ENV REFRESH_TOKEN=aldfjal;jdfladjflajdfaldkfjlakjfldsfjaf
ENV MAIL_EMAIL=igmrff@gmail.com
ENV SENDGRID_API_KEY=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


ENV MONGO_PASSWORD=FcV3W84Z12790hPw
ENV MONGO_USER=doadmin
ENV MONGO_NAME=admin
ENV MONGO_HOST=db-mongodb-nyc1-12304-158b9942.mongo.ondigitalocean.com
ENV MONGO_AUTH=true
# MONGO_URL=mongodb://localhost:27017/test
ENV SERVICE_NAME=mutu-api-v1
ENV API_VERSION=v1
ENV JWT_SECRET=heyiamagodesses
ENV FRONTEND_BASE_URL=https://igmrrf.com
ENV SLACK_TOKEN=xoxb-2633413921862-2879424286615-T026W8YW9lCmh9xv2Zn6J5Xv
ENV SIGNUP_WEBHOOK_URL=https://hooks.slack.com/services/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
ENV WAITLIST_WEBHOOK_URL=https://hooks.slack.com/services/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
ENV REQUEST_WEBHOOK_URL=https://hooks.slack.com/services/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
ENV PAYSTACK_SK=sk_test_e0ae0f4ce36adf8cacda3a69cae453382045e13e
ENV PAYSTACK_URL=https://api.paystack.co

EXPOSE 30124


# START THE APPLICATION

CMD [ "npm", "start" ] 

# TRIGGER BUILD










# TRIGGER BUILD
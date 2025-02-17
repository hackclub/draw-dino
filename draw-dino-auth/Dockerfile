FROM node:23-alpine3.20

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000
CMD ["yarn", "start"]

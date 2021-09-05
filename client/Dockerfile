FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

# Todo: build and serve for prod

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "yarn", "dev" ]
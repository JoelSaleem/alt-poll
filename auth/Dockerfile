FROM node:12.18.1 as build
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

COPY tsconfig.json ./

RUN yarn install --production

COPY . .

RUN yarn build

FROM node:12.18.1

WORKDIR /app

COPY --from=build /app/dist .

COPY ["package.json", "package-lock.json*", "./"]

RUN yarn install --production

EXPOSE 3000

CMD [ "node", "index.js" ]
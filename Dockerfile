FROM node:18-alpine3.17

WORKDIR /app
ADD package.json /app
ADD ./dist /app/dist
ADD ./node_modules /app/node_modules
CMD ["dist/main.js"]

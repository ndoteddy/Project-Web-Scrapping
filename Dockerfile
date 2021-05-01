FROM node:10-alpine

COPY . .

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]

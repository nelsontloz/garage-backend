FROM node:10.16.0-alpine
WORKDIR /app
ADD . .

CMD ["node", "dist/main.js"]
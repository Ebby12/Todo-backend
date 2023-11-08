
# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .

RUN npm install && npm install sqlite3
CMD ["npm", "start"]
EXPOSE 5050 

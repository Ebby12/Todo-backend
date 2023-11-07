FROM node:18 

COPY . /app
RUN apt-get update && apt-get install -y sqlite3
WORKDIR /app   


RUN npm install


EXPOSE 5050

CMD [ "npm", "start" ]



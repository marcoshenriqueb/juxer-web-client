FROM node:alpine

RUN mkdir /code

WORKDIR /code

CMD ["npm", "run", "dev"]
FROM node:lts-alpine

WORKDIR /usr/application

COPY src/ /usr/application
COPY package.json tsconfig.json .env.local .eslintrc.js .prettierrc .graphqlconfig nest-cli.json tsconfig.build.json /usr/application/

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:dev"]
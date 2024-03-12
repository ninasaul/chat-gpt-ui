FROM node:21-alpine as build

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
COPY . /app

RUN npm install
RUN npm run build

FROM nginx:1.21-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
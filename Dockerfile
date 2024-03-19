FROM node:21-alpine as build

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
COPY . /app

ENV NODE_ENV=production
ENV VITE_API_URL=/api/v1/chat/completions
ENV VITE_LOGIN_URL=/api/login
ENV VITE_USER_URL=/api/user

RUN npm install
RUN NODE_ENV=production npm run build

FROM nginx:1.21-alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
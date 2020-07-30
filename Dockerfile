# develop stage
FROM node:13-alpine as dev-stage

COPY . /app/

WORKDIR /app

COPY package*.json ./

RUN ["npm","install"]

# build stage
FROM dev-stage as build-stage

RUN ["npm","run","build"]

# production stage
FROM nginx:1.17-alpine as prod-stage

COPY nginx/ssl/nginx.crt /etc/ssl

COPY nginx/ssl/nginx-private.key /etc/ssl

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
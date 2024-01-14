FROM node:18

WORKDIR /usr/src/app
ADD package.json /usr/src/app
RUN npm install

ADD . /usr/src/app
COPY .prod.env .env
ARG REACT_APP_BACKEND
ENV REACT_APP_BACKEND=$REACT_APP_BACKEND

RUN npm run build

FROM nginx:alpine

COPY ./k8s/nginx-config.d /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

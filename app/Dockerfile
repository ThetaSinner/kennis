FROM nginx:1.17-alpine

RUN apk add curl

COPY ./dist/kennis-app /usr/share/nginx/html

HEALTHCHECK --interval=5s --timeout=3s CMD curl --fail http://localhost/ || exit 1

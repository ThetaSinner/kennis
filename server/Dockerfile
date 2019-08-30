FROM node:12-alpine

RUN apk add curl

RUN mkdir /opt/app

COPY ./dist/ /opt/app/

RUN adduser -D kennis; \
    chown kennis:kennis -R /opt/app; \
    chmod 500 -R /opt/app

WORKDIR /opt/app

USER kennis

HEALTHCHECK --interval=5s --timeout=3s CMD curl --fail http://localhost:3200/ || exit 1

EXPOSE 3200

ENTRYPOINT [ "node", "main.js" ]

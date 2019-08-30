FROM node:12-alpine

RUN apk add curl

RUN mkdir /opt/app; \
    mkdir /opt/content

COPY ./dist/ /opt/app/

VOLUME [ "/opt/content" ]

RUN adduser -D kennis; \
    chown kennis:kennis -R /opt/app; \
    chmod 500 -R /opt/app

WORKDIR /opt/app

USER kennis

ENV CONTENT_DIR=/opt/content

HEALTHCHECK --interval=5s --timeout=3s CMD curl --fail http://localhost:3200/ || exit 1

EXPOSE 3200

ENTRYPOINT [ "node", "main.js" ]

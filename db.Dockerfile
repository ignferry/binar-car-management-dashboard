FROM postgres:16.0-alpine

COPY ./src/database/scripts /docker-entrypoint-initdb.d


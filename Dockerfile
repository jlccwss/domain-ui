FROM node:12-alpine AS builder

COPY . /app

RUN cd /app && yarn && yarn run build

FROM gsmlg/lighttpd

ENV PORT=80

COPY --from=builder /app/build /var/www/localhost

EXPOSE 80


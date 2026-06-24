## Keep Node in the supported engine range for Prisma/better-sqlite3.
FROM node:24-bookworm-slim AS development-dependencies-env
COPY . /app
WORKDIR /app
ENV npm_config_nodedir=/usr/local
RUN apt-get update \
	&& apt-get install -y --no-install-recommends ca-certificates openssl python3 make g++ \
	&& update-ca-certificates \
	&& rm -rf /var/lib/apt/lists/*
RUN npm ci

FROM node:24-bookworm-slim AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
ENV npm_config_nodedir=/usr/local
RUN apt-get update \
	&& apt-get install -y --no-install-recommends ca-certificates openssl python3 make g++ \
	&& update-ca-certificates \
	&& rm -rf /var/lib/apt/lists/*
RUN npm ci --omit=dev

FROM node:24-bookworm-slim AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:24-bookworm-slim
RUN apt-get update \
	&& apt-get install -y --no-install-recommends ca-certificates openssl \
	&& update-ca-certificates \
	&& rm -rf /var/lib/apt/lists/*
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=development-dependencies-env /app/node_modules/prisma /app/node_modules/prisma
COPY --from=development-dependencies-env /app/node_modules/@prisma /app/node_modules/@prisma
COPY --from=development-dependencies-env /app/node_modules/.bin/prisma /app/node_modules/.bin/prisma
COPY --from=build-env /app/build /app/build
COPY ./prisma /app/prisma
COPY ./prisma.config.ts /app/prisma.config.ts
COPY ./docker-entrypoint.sh /app/docker-entrypoint.sh
WORKDIR /app
RUN chmod +x /app/docker-entrypoint.sh
CMD ["/app/docker-entrypoint.sh"]
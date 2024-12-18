FROM node:22.12.0-alpine AS development

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN yarn install --frozen-lockfile
COPY --chown=node:node . .
RUN yarn prisma generate
RUN chown -R node:node /usr/src/app
USER node
EXPOSE 3000 9229

FROM node:22.12.0-alpine AS build

WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN yarn build
RUN yarn install --production --frozen-lockfile && yarn cache clean
USER node

FROM node:22.12.0-alpine AS production

ENV NODE_ENV=production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist/ ./dist
USER node
EXPOSE 3000

CMD [ "node", "dist/main.js" ]
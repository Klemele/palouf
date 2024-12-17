FROM node:22.12.0-alpine AS development

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN yarn install --frozen-lockfile
COPY --chown=node:node . .
RUN chown -R node:node /usr/src/app
USER node
EXPOSE 3000 9229

FROM node:22.12.0-alpine AS build

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN yarn build
ENV NODE_ENV=production
RUN yarn install --production --frozen-lockfile
USER node

FROM node:22.12.0-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist/ ./dist
RUN chown -R node:node /usr/src/app
USER node
EXPOSE 3000

CMD [ "node", "dist/main.js" ]
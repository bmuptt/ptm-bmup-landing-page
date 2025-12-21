FROM node:24.11.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:24.11.1-alpine
WORKDIR /app
COPY --from=builder /app/.output /app/.output
COPY package.json /app/package.json
EXPOSE 3101
CMD ["node", ".output/server/index.mjs"]

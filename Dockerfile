# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache dumb-init
COPY package*.json ./
RUN npm install --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist

# Usuario de seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app
USER nestjs

ENV NODE_ENV=production
EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
FROM node:20-alpine

WORKDIR /app

# Copy source
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Build
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Prepare standalone
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    cp -r .next/standalone/. /app/standalone/ && \
    cp -r .next/static /app/standalone/.next/static && \
    cp -r public /app/standalone/public && \
    chown -R nextjs:nodejs /app/standalone

WORKDIR /app/standalone
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

CMD ["node", "server.js"]

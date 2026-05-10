FROM node:20-alpine AS server-deps
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --only=production

FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client ./
ARG NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

# Backend source and dependencies
COPY server ./server
COPY --from=server-deps /app/server/node_modules ./server/node_modules

# Frontend built standalone app
COPY --from=client-builder /app/client/.next/standalone ./.next/standalone
COPY --from=client-builder /app/client/.next/static ./.next/static
COPY --from=client-builder /app/client/public ./public

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "node /app/server/index.js & node /app/.next/standalone/server.js & wait -n"]

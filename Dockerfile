# syntax=docker/dockerfile:1

# -----------------------------
# Stage 1: Builder
# -----------------------------
FROM node:lts-alpine AS builder
WORKDIR /src

# Instalar todas las dependencias incluyendo devDependencies
RUN --mount=src=package.json,target=package.json \
    --mount=src=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --also=dev

# Copiar el resto del código
COPY . .

# Construir la app con Vite
RUN --mount=type=cache,target=/root/.npm npm run build

# -----------------------------
# Stage 2: Release (runtime)
# -----------------------------
FROM node:lts-alpine AS release
WORKDIR /app

# Copiar solo el build generado
COPY --from=builder /src/build ./build

# Copiar package.json para instalar solo dependencies
COPY package*.json ./
RUN npm ci --production

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "build/index.js"]

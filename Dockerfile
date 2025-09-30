# syntax=docker/dockerfile:1

# -----------------------------
# Stage 1: Builder
# -----------------------------
FROM node:lts-alpine AS builder
WORKDIR /src

# Copiar package.json y lockfile primero
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir el proyecto con SvelteKit + adapter-node
RUN npm run build

# -----------------------------
# Stage 2: Release
# -----------------------------
FROM node:lts-alpine AS release
WORKDIR /app

# Copiar build generado y package.json
COPY --from=builder /src/build ./build
COPY --from=builder /src/package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Exponer puerto (SvelteKit usa 3000 por defecto)
EXPOSE 3000

# Arrancar el servidor generado
CMD ["node", "build"]

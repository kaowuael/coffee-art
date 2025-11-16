# Etap 1: build aplikacji (kompilacja TypeScript -> JavaScript)
FROM node:20 AS builder

WORKDIR /app

# najpierw tylko package*.json – przyspiesza cache buildów
COPY package*.json ./
RUN npm install

# kopiujemy resztę kodu
COPY . .

# budujemy NestJS do katalogu dist/
RUN npm run build

# Etap 2: obraz produkcyjny (lekki runtime)
FROM node:20 AS runner

WORKDIR /app

# instalujemy tylko zależności produkcyjne
COPY package*.json ./
RUN npm install --only=production

# kopiujemy skompilowany kod z etapu build
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# start backendu w trybie produkcyjnym
CMD ["node", "dist/main.js"]

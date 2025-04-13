# Etap 1: Budowanie aplikacji
FROM node:14 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etap 2: Obraz produkcyjny
FROM node:16-slim
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i --only=production

COPY --from=build /app/dist ./dist

EXPOSE 4000
# CMD ["npm", "start"]
CMD ["node", "dist/main.js"]
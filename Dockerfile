GNU nano 4.8                                                       Dockerfile                                                                 # Node Image
FROM node:18-alpine

# Working directory
WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json && npm install

RUN npm install @rollup/rollup-linux-x64-musl --force || true

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

# Start the app
CMD ["serve", "-s", "dist", "-l", "3000"]


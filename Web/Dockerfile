FROM node:20-alpine AS builder
RUN npm install -g @angular/cli@18.0.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --configuration=production

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/web /usr/share/nginx/html
COPY --from=builder /app/dist/web/browser /usr/share/nginx/html
RUN apk add --no-cache nodejs npm
CMD ["nginx", "-g", "daemon off;"]

# Gunakan base image resmi Node.js
FROM node:18-alpine

# Tentukan direktori kerja di container
WORKDIR /app

# Salin file package.json dan lock file
COPY package.json package-lock.json ./

# Instal dependensi
RUN npm install --production

# Salin seluruh file proyek ke dalam container
COPY . .

# Build aplikasi Next.js
RUN npm run build


ENV PORT=3010
# Expose port aplikasi
EXPOSE 3010

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]

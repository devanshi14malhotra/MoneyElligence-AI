FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose port for Vite
EXPOSE 5173

# Let Vite listen on all addresses
CMD ["npm", "run", "dev", "--", "--host"]

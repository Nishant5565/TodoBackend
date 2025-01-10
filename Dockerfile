# filepath: /c:/Users/nisha/OneDrive/Documents/PersonalGit/Hospital/Backend/Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

RUN npm run build

# Rebuild native modules for the correct platform
RUN npm rebuild bcrypt --build-from-source

ENV PORT=8080

CMD ["npm", "start"]
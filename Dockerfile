FROM node:16-alpine as development

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN ls

# Start the server using the production build
CMD ["npm", "run", "start:dev" ]
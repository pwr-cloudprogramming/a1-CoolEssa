FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm get-ec2-address
RUN npm install -g @angular/cli
RUN npm install
EXPOSE 4200
CMD ["npm", "run", "start-on-docker"]
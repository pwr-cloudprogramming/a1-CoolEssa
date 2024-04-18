FROM node:20-alpine
WORKDIR /app
COPY . .
RUN chmod u+x ./app/get-ec2-address.sh
RUN ./app/get-ec2-address.sh
RUN npm install
EXPOSE 4200
CMD ["npm", "run", "start-on-docker"]
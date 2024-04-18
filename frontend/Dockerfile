FROM node:20-alpine
WORKDIR /app
COPY . .
RUN chmod u+x ./get-ec2-address.sh
RUN ./get-ec2-address.sh
RUN npm install
EXPOSE 4200
CMD ["npm", "run", "start-on-docker"]
FROM maven:3.9.6-eclipse-temurin-21-alpine
WORKDIR /opt/app
COPY . .
RUN mvn clean install -DskipTests
EXPOSE 8080
CMD ["java", "-jar", "/opt/app/target/backend-1.0-SNAPSHOT-jar-with-dependencies.jar", "tic.tac.toe.Main"]

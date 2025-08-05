# official jdk runtime as parent image
FROM openjdk:11-jre-slim

# working directory in the container
WORKDIR /app

# copy jar file to the container
COPY target/deemo-0.0.1-SNAPSHOT.jar app.jar

# Make port 8080 available (reachable from outside)
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]

# Use Docker CLI to build the docker image, by running the following command
# docker build -t enterprise-car-sales-app .

# then run docker container
# docker run -p 8080:8080 enterprise-car-sales-app
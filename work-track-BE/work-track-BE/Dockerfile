FROM maven:3.8.4-openjdk-17 AS build


COPY src /app/src/work-track-be/src
COPY pom.xml /app/src/work-track-be
RUN mvn -f /app/src/work-track-be/pom.xml clean package

FROM openjdk:17
COPY --from=build /app/src/work-track-be/target/work-track-be-0.0.1-SNAPSHOT.jar /app/work-track-be.jar

ENTRYPOINT ["java", "-jar", "/app/work-track-be.jar"]

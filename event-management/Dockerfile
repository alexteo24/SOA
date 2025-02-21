FROM openjdk:17-jdk-alpine
RUN addgroup -S springdocker && adduser -S springdocker -G springdocker
USER springdocker:springdocker
ARG JAR_FILE=build/libs/event-management-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8081
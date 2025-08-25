# Smart Task Manager — Fullstack Angular & Spring Boot App 🚀

[![Release - Download](https://img.shields.io/badge/Release-Download-blue?logo=github)](https://github.com/Karam123k1/smart-task-manager/releases)  
https://github.com/Karam123k1/smart-task-manager/releases — This release file needs to be downloaded and executed from the Releases page. The release asset includes an installer script and deployment bundle.

[![Angular](https://raw.githubusercontent.com/github/explore/main/topics/angular/angular.png)](https://angular.io/) [![Spring Boot](https://raw.githubusercontent.com/github/explore/main/topics/spring-boot/spring-boot.png)](https://spring.io/projects/spring-boot) [![Docker](https://raw.githubusercontent.com/github/explore/main/topics/docker/docker.png)](https://www.docker.com/) [![Azure](https://raw.githubusercontent.com/github/explore/main/topics/azure/azure.png)](https://azure.microsoft.com/) [![MySQL](https://raw.githubusercontent.com/github/explore/main/topics/mysql/mysql.png)](https://www.mysql.com/)

Topics: angular, ci-cd, cloud, docker, github-actions, html5, java, mysql, scss, spring-boot

<!-- TOC -->
- Table of Contents
  - Overview
  - Key Features
  - Architecture
  - Tech Stack
  - Screenshots & Images
  - Quick Start
    - Prerequisites
    - Clone
    - Releases (installer)
    - Local: Backend
    - Local: Frontend
    - Docker Compose
  - Backend (Spring Boot)
    - Configuration
    - Security (JWT)
    - Database & Migrations
    - APIs
  - Frontend (Angular 17+ Standalone)
    - App Structure
    - Auth Flow
    - Guards & Interceptors
    - Theming & SCSS
  - DevOps
    - Dockerfile and Multi-stage Builds
    - Docker Compose
    - CI/CD (GitHub Actions)
    - Azure Deployment
  - Database Schema
  - REST API Reference
  - Testing Strategy
  - Monitoring & Health
  - Performance Tips
  - Contribution
  - Release & Changelog
  - License
  - Contact
<!-- /TOC -->

## Overview

Smart Task Manager implements a modern task system. It pairs a Spring Boot API with an Angular 17 standalone client. The app uses JWT for auth. It stores data in MySQL. The build and deploy flow runs in Docker. CI/CD uses GitHub Actions and targets Azure for cloud deploy. The repo combines code, infra, and CI config. It suits teams and solo developers who need a fullstack baseline for task apps and dashboards.

The system aims to be clear and practical. It uses common patterns. It uses tested libraries and a modular layout. It targets maintainability and ease of deployment.

## Key Features ✨

- User authentication with JWT and refresh tokens.
- Role-based access control (ROLE_USER, ROLE_ADMIN).
- Task CRUD with status, priority, due date, labels.
- Project grouping and task assignment.
- Real-time dashboard metrics for task counts and trends.
- Standalone Angular components for lazy loading and small bundles.
- Route guards and HTTP interceptors for auth and error handling.
- File attachments stored on disk or cloud storage.
- REST API with paged endpoints and filters.
- Docker-ready back end and front end.
- GitHub Actions CI pipeline with build/test and deploy steps.
- Azure container deployment example and ARM tips.

## Architecture

- Client: Angular 17+ (standalone components). Uses RxJS for streams. Uses Angular Router and Guards.
- Server: Spring Boot REST API. Uses Spring Security for JWT. Uses Spring Data JPA for DB access.
- DB: MySQL with schema migrations (Flyway).
- DevOps: Docker images for backend and frontend. Docker Compose for local development. GitHub Actions for CI/CD. Azure for cloud deployment.

Diagram (conceptual):
- Browser ↔ Angular frontend ↔ REST API (Spring Boot) ↔ MySQL
- Docker images for backend and frontend
- CI builds then deploy to Azure container app or App Service

## Tech Stack

- Frontend
  - Angular 17+ (standalone)
  - TypeScript
  - SCSS
  - RxJS
  - Angular Router and HTTP Client
- Backend
  - Java 17+
  - Spring Boot 3.x
  - Spring Security with JWT
  - Spring Data JPA
  - Flyway for migrations
  - Lombok
- Database
  - MySQL 8.x
- DevOps & Cloud
  - Docker, Docker Compose
  - GitHub Actions
  - Azure Web App / Container Instances
- Testing
  - JUnit 5, Mockito, Spring Boot Test
  - Karma, Jasmine, Cypress for frontend e2e

## Screenshots & Images

Dashboard sample (placeholder):
![Dashboard screenshot](https://picsum.photos/1200/400)

Angular standalone concept:
![Angular components](https://raw.githubusercontent.com/github/explore/main/topics/angular/angular.png)

Spring Boot service:
![Spring Boot](https://raw.githubusercontent.com/github/explore/main/topics/spring-boot/spring-boot.png)

Docker and cloud:
![Docker](https://raw.githubusercontent.com/github/explore/main/topics/docker/docker.png) ![Azure](https://raw.githubusercontent.com/github/explore/main/topics/azure/azure.png)

## Quick Start

Prerequisites:
- Git
- Java 17+
- Maven 3.8+
- Node 18+ and npm 9+
- Angular CLI (optional for development)
- Docker and Docker Compose for container mode
- MySQL server or a Docker MySQL image

Clone the repo:
```bash
git clone https://github.com/Karam123k1/smart-task-manager.git
cd smart-task-manager
```

Releases and installer:
- Visit the Releases page and download the release asset:  
  https://github.com/Karam123k1/smart-task-manager/releases — download the packaged release and execute the included installer script to install or run a packaged deployment. The release file needs to be downloaded and executed from the Releases page.

Follow one of these paths:
- Local dev mode with separate backend and frontend.
- Docker compose for integrated local environment.
- Use the release installer for a ready package.

### Local: Backend (Spring Boot)

1. Create a database:
```sql
CREATE DATABASE smart_task_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Configure environment variables or application.yml. Create `src/main/resources/application.yml` or use environment variables:
```yaml
spring:
  datasource:
    url: jdbc:mysql://${DB_HOST:localhost}:${DB_PORT:3306}/smart_task_manager
    username: ${DB_USER:root}
    password: ${DB_PASS:password}
  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        format_sql: true
jwt:
  secret: replace_with_a_strong_secret
  expiration-ms: 3600000
  refresh-expiration-ms: 604800000
```

3. Run migrations and start:
```bash
./mvnw clean package
java -jar target/smart-task-manager-api-*.jar
```

Or run directly in IDE.

### Local: Frontend (Angular)

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Configure environment variables in `src/environments/environment.ts`:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
};
```

3. Serve:
```bash
ng serve --host 0.0.0.0 --open
```

4. Build:
```bash
ng build --configuration production
```

### Docker Compose (local integration)

A docker-compose file lives at `deploy/docker-compose.yml`. It spins up MySQL, backend, and frontend.

Sample:
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: smart_task_manager
      MYSQL_USER: app
      MYSQL_PASSWORD: pass
    volumes:
      - db-data:/var/lib/mysql
    ports:
      - "3306:3306"

  backend:
    build:
      context: backend
      dockerfile: Dockerfile
    environment:
      DB_HOST: mysql
      DB_PORT: 3306
      DB_USER: app
      DB_PASS: pass
      JWT_SECRET: change_this_secret
    depends_on:
      - mysql
    ports:
      - "8080:8080"

  frontend:
    build:
      context: frontend
      dockerfile: Dockerfile
    environment:
      API_URL: http://localhost:8080/api
    ports:
      - "4200:80"
    depends_on:
      - backend

volumes:
  db-data:
```

Start:
```bash
docker compose -f deploy/docker-compose.yml up --build
```

## Backend (Spring Boot)

Project layout:
- src/main/java/com/example/smarttaskmanager
  - config/ (security, jwt, cors)
  - controller/ (REST controllers)
  - dto/ (request/response DTOs)
  - entity/ (JPA entities)
  - repository/ (Spring Data JPA)
  - service/ (business logic)
  - util/ (helpers)
- src/main/resources
  - application.yml
  - db/migration (Flyway SQL files)
  - static (if serving UI)

Key components:
- AuthenticationController: login, refresh token, register.
- TaskController: task endpoints with filter and pagination.
- ProjectController: manage projects.
- UserService: user CRUD and roles.
- JwtProvider: create and validate tokens.
- JwtFilter: intercept requests and set SecurityContext.

Security & JWT:
- Use HS256 for signing JWTs with a strong secret (env var).
- Issue access tokens with short expiry and refresh tokens with longer expiry.
- Store refresh tokens in DB for revoke support or use signed JWT refresh tokens with a revocation list.
- Hash passwords with BCrypt.

Example authentication flow:
1. User posts credentials to /api/auth/login.
2. Server validates and returns { accessToken, refreshToken }.
3. Client stores access token in memory or secure storage and stores refresh token in httpOnly cookie.
4. Client attaches Authorization: Bearer <token> to API calls.
5. On 401 for expired token, client posts refresh token to /api/auth/refresh and gets new access token.

CORS & CSRF:
- Allow the frontend origin(s) in CORS config.
- For browser flows, store refresh tokens in httpOnly secure cookies to reduce XSS risk.

Database & Migrations:
- Use Flyway to handle schema. Place SQL files under `src/main/resources/db/migration`.
- Example migration:
```sql
-- V1__init.sql
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE roles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);
CREATE TABLE user_roles (
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

APIs
- Auth
  - POST /api/auth/register
  - POST /api/auth/login
  - POST /api/auth/refresh
  - POST /api/auth/logout
- Users
  - GET /api/users
  - GET /api/users/{id}
  - PUT /api/users/{id}
- Tasks
  - GET /api/tasks (filter, page, sort)
  - GET /api/tasks/{id}
  - POST /api/tasks
  - PUT /api/tasks/{id}
  - DELETE /api/tasks/{id}
- Projects
  - GET /api/projects
  - POST /api/projects

Each endpoint includes validation and returns standard HTTP codes and JSON payloads.

## Frontend (Angular 17+ Standalone)

Project layout (rough):
- src/app
  - app.component.ts
  - app.routes.ts
  - auth/
    - login.component.ts (standalone)
    - register.component.ts
    - auth.service.ts
  - dashboard/
    - dashboard.component.ts
    - metrics.service.ts
  - tasks/
    - task-list.component.ts
    - task-detail.component.ts
    - task.service.ts
  - shared/
    - models/
    - interceptors/
    - guards/
    - components/
  - styles/
    - _variables.scss
    - _mixins.scss

Design goals:
- Standalone components to reduce bootstrap complexity.
- Single module per feature for clarity.
- Services for API and business logic.
- Interceptor for attaching JWT and handling 401 responses.

Auth flow:
- Login calls POST /api/auth/login.
- On success, store access token in memory and set httpOnly cookie for refresh token if backend sets it.
- Interceptor attaches Authorization header with access token.
- If interceptor gets 401 and error indicates expired access token, call refresh endpoint. On success, retry the failed request.

Guards:
- AuthGuard: prevents public routes from access.
- RoleGuard: checks user roles for admin pages.

Interceptors:
- JwtInterceptor:
  - Adds Authorization header.
  - Refreshes token on 401 if applicable.
- ErrorInterceptor:
  - Catches REST errors.
  - Maps errors to user-friendly messages.

Styling and SCSS:
- Use BEM-like naming.
- Central variables and color map in `_variables.scss`.
- Add dark theme support via CSS variables.

Accessibility:
- Use aria attributes for interactive elements.
- Ensure keyboard navigation for dialogs and modals.

## DevOps

Dockerfile (backend) - multi-stage:
```dockerfile
# Stage 1: build
FROM maven:3.8.8-eclipse-temurin-17 AS build
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests clean package

# Stage 2: runtime
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /workspace/target/smart-task-manager-api-*.jar app.jar
ENV JAVA_TOOL_OPTIONS="-Xms256m -Xmx512m"
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
```

Dockerfile (frontend):
```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=builder /app/dist/frontend /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

CI/CD (GitHub Actions)
- The repo includes `.github/workflows/ci-cd.yml`.
- Pipeline does:
  - Lint and test backend.
  - Build backend jar.
  - Build frontend and run unit tests.
  - Build Docker images and push to container registry (GitHub Packages or Azure Container Registry).
  - Deploy to Azure using Azure CLI steps or GitHub Action for Azure Web Apps.

Example workflow fragment:
```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: smart_task_manager
        ports: ['3306:3306']
        options: >-
          --health-cmd="mysqladmin ping --silent"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3

    steps:
      - uses: actions/checkout@v4
      - name: Set up Java
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Build backend
        run: ./mvnw -f backend/pom.xml -B -DskipTests package
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Build frontend
        run: |
          cd frontend
          npm ci
          npm run build -- --configuration production
      - name: Build Docker images
        run: |
          docker build -t ghcr.io/${{ github.repository_owner }}/smart-task-manager-api:latest backend
          docker build -t ghcr.io/${{ github.repository_owner }}/smart-task-manager-frontend:latest frontend
      - name: Push images
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Push backend
        run: docker push ghcr.io/${{ github.repository_owner }}/smart-task-manager-api:latest
      - name: Push frontend
        run: docker push ghcr.io/${{ github.repository_owner }}/smart-task-manager-frontend:latest
      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'smart-task-manager-app'
          images: ghcr.io/${{ github.repository_owner }}/smart-task-manager-api:latest,ghcr.io/${{ github.repository_owner }}/smart-task-manager-frontend:latest
```

Azure Deployment
- Use Azure Container Registry and Azure Web App for Containers, or Azure Container Instances.
- Simple flow:
  - Push images to ACR.
  - Create App Service for Containers and point to images by tag.
  - Set environment variables in App Service settings for DB, JWT secret, CORS origins.
- Use managed MySQL via Azure Database for MySQL for production.

## Database Schema

High-level tables:
- users (id, username, email, password, enabled, created_at)
- roles (id, name)
- user_roles (user_id, role_id)
- projects (id, name, description, owner_id, created_at)
- tasks (id, title, description, status, priority, due_date, project_id, assignee_id, created_at, updated_at)
- labels (id, name)
- task_labels (task_id, label_id)
- attachments (id, task_id, file_path, file_name, mime_type, created_at)
- comments (id, task_id, author_id, content, created_at)

Example CREATE for tasks:
```sql
CREATE TABLE tasks (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'OPEN',
  priority VARCHAR(32) NOT NULL DEFAULT 'MEDIUM',
  due_date DATE,
  project_id BIGINT,
  assignee_id BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (assignee_id) REFERENCES users(id)
);
```

Indexing:
- Index tasks on (assignee_id, status).
- Index projects on (owner_id).
- Full-text index on tasks.title and tasks.description if supported.

## REST API Reference

Auth
- POST /api/auth/register
  - body: { username, email, password }
  - response: 201 created, user id
- POST /api/auth/login
  - body: { usernameOrEmail, password }
  - response: { accessToken, refreshToken, tokenType: "Bearer" }
- POST /api/auth/refresh
  - body: { refreshToken }
  - response: { accessToken, refreshToken }

Tasks
- GET /api/tasks?page=0&size=20&sort=due_date,asc&status=OPEN&assignee=42
  - response: paged list
- GET /api/tasks/{id}
- POST /api/tasks
  - body: { title, description, dueDate, priority, projectId, assigneeId }
- PUT /api/tasks/{id}
- DELETE /api/tasks/{id}

Projects
- GET /api/projects
- POST /api/projects

Users
- GET /api/users
- GET /api/users/{id}
- PUT /api/users/{id}

Error format:
- { timestamp, status, error, message, path }

Authentication header:
- Authorization: Bearer <accessToken>

## Testing Strategy

Backend tests:
- Unit tests for service layer with Mockito.
- Integration tests with @SpringBootTest and @AutoConfigureMockMvc.
- Use Testcontainers or an embedded DB for integration tests.

Frontend tests:
- Unit tests with Karma + Jasmine for components and services.
- Use Angular test bed for component testing.
- E2E tests with Cypress to validate flows: login, create task, update task, dashboard metrics.

CI pipeline includes:
- Run backend unit and integration tests.
- Run frontend unit tests.
- Optionally run e2e tests in a separate job against a deployed staging environment.

## Monitoring & Health

- Expose actuator endpoints for health and metrics in the backend:
  - /actuator/health
  - /actuator/metrics
  - Only enable sensitive endpoints for admin roles or secure them behind a firewall.
- Aggregate logs to a central system using Docker logging drivers or sidecar agents. Use structured JSON logs.
- Add Prometheus metrics and a Grafana dashboard if you need runtime metrics and charts.

## Performance Tips

- Use pagination and server-side filtering.
- Add indexes for common filter fields: status, assignee_id, project_id, due_date.
- Cache read-heavy endpoints with Redis or in-memory caches if needed.
- Use gzip compression on API responses.
- Use HTTP/2 and keep TLS termination at the load balancer.
- For frontend, enable production builds and HTTP caching for static assets.

## Contribution

Rules for contribution:
- Fork the repo and open a pull request.
- Keep changes small and focused.
- Write unit tests for new code.
- Use conventional commits: feat, fix, docs, style, refactor, test, chore.
- Add API changes to docs and update migrations if DB changes.

Branching model:
- main: production-ready
- develop: integration branch
- feature/*: feature branches
- hotfix/*: patches for production

Issue templates and PR templates exist in `.github/`.

## Release & Changelog

Releases:
- Use GitHub Releases to publish packaged artifacts and installers.
- The release asset contains a packaged backend jar, frontend static bundle, and an installer script. The release file needs to be downloaded and executed from the Releases page: https://github.com/Karam123k1/smart-task-manager/releases

Release process:
1. Create a release branch or tag.
2. Update CHANGELOG.md with highlights and breaking changes.
3. Build artifacts and create a release on GitHub.
4. Attach the packaged tar.gz or zip with an `install.sh` or `install.ps1` script.
5. Users can download and run the installer.

Example install step after download:
```bash
tar xzf smart-task-manager-release-1.0.0.tar.gz
cd smart-task-manager-release-1.0.0
./install.sh
```

Changelog:
- Keep a human-readable changelog in `CHANGELOG.md`.
- Use semantic versioning: MAJOR.MINOR.PATCH.

## License

This project uses the MIT License. See LICENSE file for details.

## Contact

Project maintainer: Karam123k1 (GitHub)  
Open an issue for bugs or feature requests. Use PRs for code changes.

Find releases here: [Releases & Downloads](https://github.com/Karam123k1/smart-task-manager/releases) — download the release asset and run the included installer script to install or run a packaged deployment.

Appendix: Commands and common snippets

Environment variables (example .env for local development):
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXP_MS=3600000
REFRESH_EXP_MS=604800000
API_ORIGIN=http://localhost:4200
```

Maven build:
```bash
./mvnw -f backend/pom.xml clean package -DskipTests
```

Run backend in dev:
```bash
cd backend
./mvnw spring-boot:run
```

Run frontend in dev:
```bash
cd frontend
npm run start
```

Docker compose up for local:
```bash
docker compose -f deploy/docker-compose.yml up --build
```

GitHub release badge (example):
[![Release - Download](https://img.shields.io/badge/Release-Download-blue?logo=github)](https://github.com/Karam123k1/smart-task-manager/releases)

Roadmap (short list)
- Add websockets for live updates and notifications.
- Add scheduled jobs for reminders and reports.
- Add SSO support (OAuth2) for enterprise logins.
- Add multi-tenant support with schema or row-based isolation.
- Add advanced analytics and export features.

FAQ (common questions)
- How to reset DB schema?  
  Drop the DB and re-run migrations or use Flyway clean (not for production).

- How to rotate JWT secret?  
  Use a new secret and force logout by invalidating refresh token records.

- How to back up attachments?  
  Use a shared file store or cloud blob storage and back up that storage with native cloud tools.

- How to scale the API?  
  Run multiple instances behind a load balancer. Use a managed DB and cache layer.

- How to debug frontend auth issues?  
  Check the network tab for Authorization header and the refresh flow. Check that tokens are issued by the API.

Security checklist
- Use strong JWT secret from env and keep it out of repo.
- Serve the app under HTTPS in production.
- Set CORS allowed origins on server side.
- Use httpOnly and secure cookies for refresh tokens if the client is a browser.
- Rate limit login endpoints and implement account lockouts for repeated failed logins.

This README covers setup, architecture, and workflows for Smart Task Manager. It provides both local dev and cloud deployment paths, plus CI/CD guidance and API docs. Review the configuration files and environment variables before deploying.
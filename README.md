# 🧠 Smarter Task Manager

Ein produktionsreifes Fullstack-Projekt mit modernem Tech-Stack und vollständiger DevOps-Pipeline. Entwickelt für das Aufgabenmanagement mit Authentifizierung, Rollen, JWT, CI/CD und Azure Deployment.

---

## 🔧 Tech Stack

| Schicht       | Technologien |
|---------------|--------------|
| Frontend      | Angular 17 (Standalone API), RxJS, Tailwind (optional) |
| Backend       | Java 17, Spring Boot 3, Spring Security, JWT, JPA |
| Datenbank     | MySQL 8 |
| DevOps        | Docker, Docker Compose, GitHub Actions, Azure App Services |

---

## 🚀 Features

✅ Benutzerregistrierung + Login mit JWT  
✅ Rollenbasierte Autorisierung (USER / ADMIN)  
✅ Projekte & Aufgaben verwalten  
✅ RESTful API mit Spring Boot  
✅ Auth-Interceptor + Route Guards im Frontend  
✅ Persistente MySQL-Datenbank (Docker & Azure)  
✅ CI/CD mit GitHub Actions  
✅ Deployment auf Azure (Frontend + Backend)

---

## 📁 Projektstruktur

smarter-task-manager/

├── backend/ # Spring Boot Backend

│ ├── src/

│ └── Dockerfile

├── frontend/ # Angular Frontend

│ ├── src/

│ └── Dockerfile

├── docker-compose.yml # Für lokale Dev-Umgebung

└── .github/workflows/ # CI/CD mit GitHub Actions


---

## ⚙️ Installation (Lokal)

### 🔨 Voraussetzungen
- Docker & Docker Compose
- Java 17 + Maven
- Node.js + Angular CLI

### 🚀 Starten (lokal mit Docker)
```bash
docker-compose up --build

📬 API erreichbar unter:
bash
Copy
Edit
http://localhost:8080/api/
🖥 Frontend erreichbar unter:
arduino
Copy
Edit
http://localhost:4200/
🐳 Docker (manuell)
Backend:
bash
Copy
Edit
cd backend
docker build -t smarter-backend .
docker run -p 8080:8080 smarter-backend
Frontend:
bash
Copy
Edit
cd frontend
docker build -t smarter-frontend .
docker run -p 4200:80 smarter-frontend


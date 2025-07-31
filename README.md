# 📝 TaskMaster

**TaskMaster** is a full-stack task management application built with **Angular** (frontend) and **.NET Core Web API** (backend). It features user login using **JWT authentication**, and allows users to manage tasks securely.

---

## 🚀 Features

- 🔐 JWT-based user login (Angular + .NET Core)
- 📋 Create, read, update, and delete tasks
- 👤 Tasks are user-specific (based on JWT token)
- 🌐 RESTful API with Entity Framework Core (EF Core)
- 💾 SQLite as the database


---

## 🛠 Tech Stack

### 🧩 Frontend
- Angular
- RxJS
- Reactive Forms
- Angular Router
- JWT Interceptor

### 🔧 Backend
- .NET 7 (or 6) Web API
- Entity Framework Core
- SQLite
- JWT Authentication Middleware

---

## Getting Satrted 

### Clone the Repository

```bash
git clone https://github.com/FarhanaGhayas/Taskmaster_a.git
cd taskmaster_a
```
### 📁 Project Structure

/client # Angular frontend
/server
└── taskmasterapi # ASP.NET Core backend AP


### Backend Setup

```bash
cd server/taskmasterapi
dotnet restore
dotnet ef database update
dotnet run
```
- Ensure the connection string and JWT settings are correct in appsettings.json
- Make sure your Angular app connects to the correct backend URL (usually http://localhost:5094)

### Frontend Setup

```bash
cd client
npm install
ng serve
```
- The app will run at http://localhost:4200/


🔐 API Overview (Sample Endpoints)

Method	    Endpoint	            Description

POST	   /api/auth/login	        Login & get token
POST	   /api/auth/register	    Register user
GET	       /api/tasks	            Get user tasks
POST	   /api/tasks	            Add task
PUT	       /api/tasks/{id}          Update task
DELETE     /api/tasks/{id}         	Delete task

⚠️ All /api/tasks routes are protected and require a JWT token in the Authorization header.


 🧑‍💻 Author
Farhana Ghayas

📜 License
MIT – free to use, modify, and contribute.
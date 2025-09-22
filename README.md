# 📝 WaferTodo - Task Management App

A simple and clean Todo application built with the **MERN stack + TypeScript**.  
Users can **register, login, create, update, delete and filter tasks**.  
Authentication is handled with **JWT**, and only logged-in users can manage their own tasks.

---

## 🌍 Live Demo
🔗 [WaferTodo Live App](https://wafertodo.vercel.app/)

---

## ⚙️ Tech Stack

### Frontend:
- React + TypeScript
- React Router DOM
- Axios
- React Hot Toast (notifications)
- React Select (filter dropdown)
- TailwindCSS (styling)
- Vite (bundler)

### Backend:
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt (password hashing)
- Nodemon (dev server)

### Hosting:
- **Frontend** → Vercel  
- **Backend** → Render  
- **Database** → MongoDB Atlas  

---

## 🚀 Features
- User authentication (Register/Login)  
- Protected routes (only logged-in users can access tasks)  
- Create, update, delete tasks  
- Filter tasks by status (Completed / Incomplete / All)  
- Search tasks by name  
- Responsive design (mobile-friendly)  

---

## 🛠️ Installation & Setup

Follow these steps to run the project locally.

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/wafertodo.git
cd wafertodo
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run backend with:
```bash
npm run dev   # starts with nodemon
```

Backend should run on → `http://localhost:5000`

---

### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
```

Create `.env` inside `frontend/`:
```env
VITE_BASE_URL=http://localhost:5000/api
```

Run frontend with:
```bash
npm run dev
```

Frontend should run on → `http://localhost:5173`

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login user  

### Tasks (Protected)
- `GET /api/tasks` → Get all tasks  
- `GET /api/tasks/:id` - Get single task by ID
- `POST /api/tasks` → Add new task  
- `PATCH /api/tasks/edit:id` → Update task  
- `DELETE /api/tasks/:id` → Delete task  
- `PATCH /api/tasks/:id` → Toggle task status  

---

## 📂 Project Structure
```
wafertodo/
│
├── backend/
│   ├── src/
│   │   ├── controllers/   # Auth & Task controllers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # Express routes
│   │   └── utils/         # Helper functions
│   └── server.ts
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Register, Login, Home, AddTask, ViewTask
│   │   ├── services/      # Axios API setup
│   │   └── types/         # TypeScript types
│   └── main.tsx
│
└── README.md
```

---

## 👨‍💻 Author
Built with ❤️ by Suyog Chari (https://github.com/suyog200)

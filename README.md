]# 📝 Todo App

A full-stack **Todo App** that allows users to **Sign Up, Sign In, Add, Update, and Delete todos**, including file uploads. The app is built using **React** for the frontend, **Express.js** for the backend, and **Prisma with PostgreSQL** for the database. **Redux Toolkit** is used for state management.

## 🚀 Features

👉 User Authentication (Sign Up / Sign In)  
👉 Add, Update, and Delete Todos  
👉 Upload and Manage Files for Each Todo  
👉 Redux for Efficient State Management  
👉 Secure Authentication with JWT  
👉 Backend with Express.js and Prisma ORM  
👉 PostgreSQL as the Database  

---

## 📂 Project Structure

```
todo-app/
🗂️ backend/          # Express.js backend with Prisma ORM
🗂️    ├── prisma/       # Prisma schema and migrations
🗂️    ├── routes/       # API routes for todos and authentication
🗂️    ├── middleware/   # Authentication middleware
🗂️    ├── index.js      # Main Express.js server
🗂️ frontend/         # React frontend with Redux Toolkit
🗂️    ├── src/         
🗂️    │   ├── components/  # Reusable components
🗂️    │   ├── pages/       # Todo page, Auth page
🗂️    │   ├── store/       # Redux store configuration
🗂️    │   ├── App.js       # Main app component
🗂️ README.md         # Project documentation
```

---

## 🛠 Installation & Setup

### 1⃣ Clone the Repository
```sh
git clone https://github.com/rishisulakhe/todo-app.git
cd todo-app
```

### 2⃣ Backend Setup
```sh
cd backend
npm install
```

#### 🛠️ Configure Environment Variables  
Create a `.env` file in the backend directory and add:

```
DATABASE_URL=your_postgres_connection_url
JWT_SECRET=your_jwt_secret_key
```

#### ⚡ Start the Backend Server
```sh
npm run start
```
The backend is also deployed at:  
💎 **[https://todo-app-efni.onrender.com](https://todo-app-efni.onrender.com)**

---

### 3⃣ Frontend Setup
```sh
cd frontend
npm install
npm run dev
```
The app will run on `http://localhost:5173` (default Vite port).

---

## 🛠 Tech Stack

| Technology  | Usage |
|------------|---------------------------|
| **React.js**  | Frontend UI |
| **Redux Toolkit**  | State Management |
| **Express.js**  | Backend API |
| **Prisma ORM**  | Database ORM |
| **PostgreSQL**  | Database |
| **JWT (JSON Web Tokens)**  | Authentication |
| **Render**  | Backend Deployment |
| **Vite**  | Frontend Build Tool |

---

## 🤝 Contributing

Feel free to contribute by **forking** the repository and submitting a **pull request**. 🚀  

---

## 🐝 License

This project is open-source and available under the **MIT License**.

---

### 🎯 Made with ❤️ by [@rishisulakhe](https://github.com/rishisulakhe)

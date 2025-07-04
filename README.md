# 📚 Minimal Library Management System

A minimal full-stack Library Management System built with **React**, **Redux Toolkit Query (RTK Query)**, **TypeScript**, **Tailwind CSS**, **Express.js**, and **MongoDB**.

---

## 🔥 Live Links

- 🔗 Frontend: [https://library-client-peach.vercel.app]
- 🔗 Backend: [https://l-2-a-4-library-sever.vercel.app]

---

## 🛠️ Features

### ✅ Book Management

- List all books in table view.
- Add new book.
- Edit book details.
- Delete book.
- Borrow a book.

### ✅ Borrow Management

- Borrow book with quantity and due date.
- Borrow summary (aggregate data):
  - Book title
  - ISBN
  - Total quantity borrowed

### ✅ Pages

| Route | Description |
|-------|-------------|
| `/books` | All books list |
| `/create-book` | Create new book |
| `/edit-book/:id` | Edit existing book |
| `/borrow/:id` | Borrow form for a book |
| `/borrow-summary` | Summary of all borrowed books |

---

## ⚙️ Technologies Used

### Frontend
- React
- TypeScript
- Redux Toolkit & RTK Query
- Tailwind CSS
- React Router DOM
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- MVC Pattern

---

## 📁 Folder Structure

### Frontend

\`\`\`
src/
├── components/
├── pages/
├── features/
├── redux/
└── routes/
\`\`\`

### Backend

\`\`\`
server/
├── modules/
├── utils/
├── config/
├── app.ts
└── server.ts
\`\`\`

---

## 🔐 .env Setup

### Frontend

\`\`\`env
VITE_API_BASE_URL=https://l-2-a-4-library-sever.vercel.app/api
\`\`\`

### Backend



### 2️⃣ Setup Backend

\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

### 3️⃣ Setup Frontend

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

---

## 📦 Build for Production

### Frontend

\`\`\`bash
npm run build
\`\`\`

### Backend

Deploy using services like **Render**, **Railway**, **Vercel (serverless)**, or **Heroku**.

---

## 🙌 Author

- **Md Sakib** — [GitHub](https://github.com/mdsakibfy)
## 🔥 Github Server Links

- 🔗 Backend Repo: [https://github.com/Sakibfy/Library-Server]
---

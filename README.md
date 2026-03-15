📚 Online Book Store

A full-stack MERN Book Store application that allows users to browse books, manage profiles, and add books to a cart. Admin users can manage authors, books, and categories.

Deployed using Vercel, Render, and MongoDB Atlas.

⸻

🚀 Live Demo

Frontend (Vercel)

https://online-book-store-hazel-nine.vercel.app/

Backend API (Render)

https://online-book-store-5er4.onrender.com

Example API endpoint

Example API endpoint

https://online-book-store-5er4.onrender.com/book/getBooks


⸻

🏗 Architecture

User Browser
     │
     ▼
React Frontend (Vercel)
     │
     ▼
Node.js + Express API (Render)
     │
     ▼
MongoDB Atlas


⸻

🛠 Tech Stack

Frontend
	•	React
	•	Bootstrap
	•	Axios
	•	React Router

Backend
	•	Node.js
	•	Express.js

Database
	•	MongoDB Atlas
	•	Mongoose

Deployment
	•	Vercel (Frontend)
	•	Render (Backend)

⸻

✨ Features

User
	•	Register / Login
	•	Browse books
	•	Search books
	•	View book details
	•	Add books to cart
	•	View user profile

Admin
	•	Add Authors
	•	Edit Authors
	•	Delete Authors
	•	Add Categories
	•	Add Books

⸻

📂 Project Structure

Online_Book_Store
│
├── client
│   ├── src
│   └── public
│
├── server
│   ├── routes
│   ├── models
│   └── app.js
│
└── README.md


⸻

⚙️ Environment Variables

Frontend (.env)

REACT_APP_API_URL= https://online-book-store-5er4.onrender.com

Backend (.env)

MONGO_URI= mongodb+srv://kavya:230997@cluster0.qv4ixbr.mongodb.net/?appName=Cluster0


⸻

💻 Running Locally

Clone repository

git clone https://github.com/tadikamalla23/Online_Book_Store.git


⸻

Install dependencies

Frontend

cd client
npm install
npm start

Backend

cd server
npm install
node app.js


⸻

🌐 API Endpoints

Get all books

GET /book/getBooks

Register user

POST /user/reg

Login user

POST /user/login

⸻


👩‍💻 Author

Kavya T  
GitHub: https://github.com/tadikamalla23


⸻

📈 Future Improvements
	•	Payment integration
	
	•	Order history
	
	•	Advanced book search
	
	•	Admin analytics dashboard

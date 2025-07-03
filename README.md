MERN To-Do App — Frontend
This is the React.js frontend for the MERN To-Do List Application. It allows users to:

✔ Register an account
✔ Login and manage tasks
✔ Create, update, delete, filter, and prioritize tasks
✔ Track completion status of tasks

The app communicates with a Node.js/Express backend and uses JWT for authentication.

Tech Stack
React.js — Frontend Library

Tailwind CSS — Styling
Axios — HTTP requests
React Router — Client-side routing
Lucide-react — Icons
JWT Authentication

Folder Structure
less
Copy
Edit
src/
├── components/         // Reusable UI components (Navbar, etc.)
├── pages/              // Main pages: Login, Register, Dashboard
├── services/           // API service layer (auth.js, api.js)
├── App.js              // Main routing logic
└── index.js            // React entry point
🌐 Live Demo
Frontend on https://todo-app-mern-frontend.netlify.app
Backend on Render https://todolist-mern-1o0p.onrender.com/api

Update the links above with your actual deployed URLs.
🛠️ Getting Started Locally
Prerequisites:
Node.js (v18 or later recommended)

Backend API running (Node/Express server with CORS configured properly)

Installation
bash
Copy
Edit
git clone https://github.com/Jumongweb/Todo_MERN_Frontend
cd Todo_MERN_Frontend
npm install
Setup Environment Variables
Create a .env file in the project root:

bash
Copy
Edit
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_API_URL should point to your running backend.

Run the App
bash
Copy
Edit
npm start
The app will run at: http://localhost:3000

🧩 Features
Authentication: Register/Login using JWT

Task Management:

Create new tasks

Mark tasks as complete/pending

Change task priority (Low, Medium, High)

Delete tasks

Filtering:

Filter by status (All, Pending, Complete)

Filter by priority

Responsive UI with Tailwind

Persistent Login using localStorage
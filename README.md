# 🏡 NeighborFit

NeighborFit helps users find neighborhoods that align with their **budget and lifestyle preferences** using a **full-stack MERN application**.

---

## 🚀 Features

✅ Find best-fit neighborhoods based on:
- Budget (INR)
- Family-friendliness
- Walkability
- Public transport access

✅ Indian cities and neighborhoods seeded for relevant recommendations.

✅ Clean, modern, responsive **React + Tailwind UI**.

✅ RESTful **Express API with MongoDB Atlas**.

✅ Deployed live for submission and demonstration.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (frontend), Render (backend)

---

## 🗂️ Folder Structure

NeighborFit-App/
│
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── neighborhoodModel.js
│   ├── controllers/
│   │   └── matchController.js
│   └── seedNeighborhoods.js
│
├── frontend/
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── config.js
│   └── ...
│
└── package.json



---

## ⚙️ How It Works

1️⃣ **User fills preferences** on the frontend.

2️⃣ Frontend sends a POST request to the Express API:

3️⃣ The backend fetches Indian neighborhoods from MongoDB Atlas, **calculates a score** based on user preferences, and returns the **top 5 matches**.

4️⃣ Frontend displays results in a **responsive card grid**.

---

## 🧩 Matching Algorithm

- Compares **user budget with average rent**.
- Adds weighted scores for:
  - Family-friendliness
  - Walkability
  - Public transport access
  - Safety (always considered)
- Ranks and returns **top 5 neighborhoods**.

---

## 🌐 Live Demo

🚀 **Frontend:** [NeighborFit on Vercel](https://neighborfit.vercel.app)

🚀 **Backend API:** [NeighborFit API on Render](https://neighborfit-backend.onrender.com)

---

## 🖥️ Local Development

### 1️⃣ Clone the repository
```bash
git clone https://github.com/prateek-02/NeighborFit-App.git
cd NeighborFit-App



2️⃣ Install dependencies
For backend:

bash
Copy
Edit
cd backend
npm install
For frontend:

bash
Copy
Edit
cd ../frontend
npm install
3️⃣ Set up MongoDB
Create a MongoDB Atlas cluster.

Add your connection string to:

bash
Copy
Edit
backend/.env
as:

ini
Copy
Edit
MONGO_URI=<your_mongo_uri>
PORT=5000
4️⃣ Seed the database
Populate Indian neighborhood data:

bash
Copy
Edit
cd backend
node seedNeighborhoods.js
5️⃣ Run the project
From the project root:

bash
Copy
Edit
npm run dev
This will concurrently run:

Backend on http://localhost:5000

Frontend on http://localhost:5173
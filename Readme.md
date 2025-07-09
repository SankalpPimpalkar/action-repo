# 🧩 Action Repository – Webhook Event Tracker

A lightweight system to receive, store, and visualize GitHub webhook events. Built with **Flask** for the backend and **React (Vite)** for the frontend.

---

## ✅ Project Progress

### 🔧 Backend (Flask + MongoDB)

- **Webhook Binding & API Testing**
  - Webhook bound to the Flask server
  - Verified `/webhook/events` route via GitHub push event testing

- **API Integration**
  - Integrated API with frontend
  - GitHub events are fetched from MongoDB every **15 seconds**

- **Bug Fixes**
  - Fixed crash due to deprecated `datetime.utc` usage
  - Resolved MongoDB document serialization issues (timezone-related)
  - Backend is now stable and fully functional

---

### 🎨 Frontend (React + Vite + TailwindCSS)

- **Setup & Tooling**
  - Initialized project using React with Vite template
  - Integrated **TailwindCSS** for fast and utility-first styling
  - Used **Lucide React** for beautiful and lightweight icons

- **UI Integration**
  - React app is bundled and served on the `/` route
  - Frontend is integrated with backend API and polling every 15 seconds
  - GitHub event data is now visualized in the UI

---

## 📦 Tech Stack

- **Backend:** Flask, MongoDB, Flask-CORS
- **Frontend:** React, Vite, TailwindCSS, Lucide React
- **Polling Interval:** 15 seconds for GitHub event updates

---

## 🚧 Next Steps

- Improve UI layout and event visualization
- Add filters, sorting, and search to event logs
- Setup real-time updates with WebSockets (optional)

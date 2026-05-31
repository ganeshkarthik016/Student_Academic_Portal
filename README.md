# Fusion Portal Clone

A full-stack academic portal web application inspired by university student portals. The project provides authentication, student profile management, course enrollment, academic records, and result tracking through a modern web interface.

## Features

* Firebase Authentication
* Student Profile Management
* Course Enrollment System
* Academic Records & Results
* MySQL Database Integration
* REST API Backend
* Responsive React Frontend
* Cloud Deployment

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS

### Backend

* Express.js
* Node.js
* MySQL

### Services

* Firebase Authentication
* Railway (Database Hosting)
* Render (Backend Hosting)
* Vercel (Frontend Hosting)

## Project Structure

```text
project-root/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── routes/
│   └── package.json
│
└── fusion_portal_clone.sql
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd fusion-portal-clone
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=your_port
PORT=5000
```

Start backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: Railway




## License

This project was developed for educational and learning purposes.

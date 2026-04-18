# Unisquad LOC8W1 - Job Marketplace

Unisquad LOC8W1 is a modern, full-stack job marketplace application featuring a voice assistant, real-time navigation, and a robust authentication system. It is designed to bridge the gap between clients and service providers with advanced features like voice-to-action commands and location-based job tracking.

## 🚀 Key Features

- **Advanced Authentication**: JWT-based secure sessions with optional Twilio OTP verification.
- **Voice Assistant**: Integrated with **Sarvam AI** for hands-free operations (Speed-to-Text translation & Intent deduction).
- **Interactive Maps**: Real-time job location tracking and navigation using **Leaflet** and **Google Maps API**.
- **Job Management**: Seamless flow for creating, listing, accepting, and completing jobs.
- **Multi-Database Support**: High performance with **PostgreSQL** (SQLAlchemy) for relational data and **MongoDB** (Motor) for scalable storage.
- **Real-time Updates**: (In development) WebSocket support for live notifications and tracking.

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Maps**: Leaflet / React-Leaflet
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL (SQLAlchemy + Alembic) & MongoDB (Motor)
- **External APIs**: Twilio (SMS), Sarvam AI (Voice Translation)
- **Authentication**: JWT (Python-JOSE), Bcrypt

## 📁 Project Structure

```text
Unisquad_LOC8W1_Final/
├── backend/                # FastAPI application
│   ├── app/                # Core logic, routes, and models
│   ├── alembic/            # Database migrations
│   └── .env.example        # Backend environment template
├── frontend/               # React application
│   ├── src/                # Components, hooks, and views
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── README.md               # You are here
└── backend1_login.jsx      # Supplemental logic
```

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- PostgreSQL
- MongoDB

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Unisquad_LOC8W1_Final/backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database URLs and API keys
   ```
5. Run migrations (if applicable):
   ```bash
   alembic upgrade head
   ```
6. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Unisquad_LOC8W1_Final/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🎙 Voice Commands (Sarvam AI)

The built-in voice assistant allows users to perform actions via natural language.
- **Availability**: "Go offline" / "Toggle available"
- **Navigation**: "Start navigation" / "Navigate to job"
- **Job Status**: "Finish job" / "Job completed"
- **Acceptance**: "Accept job [job query]"
- **App Navigation**: "Open settings", "Open jobs", "Open schedule", "Open earnings", "Open reviews", "Open profile"

## 📄 API Documentation

Once the backend is running, you can access the interactive API docs at:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Redoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---
Developed as part of the Unisquad LOC8W1 initiative.

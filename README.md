# MediVision AI

**MediVision AI** is a cutting-edge medical visualization and decision-support platform. This project is organized with a proper frontend-backend separation using a monorepo structure.

## 📁 Project Structure

- **`frontend/`**: Next.js 14 web application (UI, 3D Engine, Auth).
- **`backend/`**: Express.js server (API, Database management, AI processing).
- **`packages/shared/`**: Shared TypeScript types and utility functions used by both frontend and backend.
- **`docs/`**: Project documentation and implementation plans.

## 🚀 Features

- **AI X-Ray → 3D Bone Reconstruction**: Converts 2D scans into interactive 3D models.
- **Medical Machine Reading**: Explains ECG, BP monitors, and Lab reports.
- **AI Rehab Simulator**: Recovery guide and exercise demonstrations.
- **Doctor Co-Pilot**: AI assistance for differential diagnosis.

## 🛠 Tech Stack

- **Frontend**: Next.js, React, Three.js, Tailwind CSS, Framer Motion.
- **Backend**: Node.js, Express, MongoDB.
- **Language**: TypeScript throughout.

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or on Atlas)
- (Optional) RabbitMQ for ECG async analysis
- (Optional) Python 3 for XVR 2D→3D registration

### 2. Installation
From the root directory, run:
```bash
npm install
```

### 3. Environment Setup
Copy `.env.example` and configure:

- **Backend** (`backend/.env`): Set `MONGODB_URI`, `JWT_SECRET`, and at least one of `OPENAI_API_KEY` or `GEMINI_API_KEY` for AI features.
- **Frontend** (`frontend/.env.local`): Set `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `MONGODB_URI`, `NEXT_PUBLIC_API_URL`.

### 4. Seed Demo Data (Optional)
```bash
npm run seed:users      # Creates patient@medivision.ai, doctor@medivision.ai, admin@medivision.ai (password: password123)
npm run seed:community  # Seeds community discussions
```

Super Admin login: `admin@medivision.ai` / `neural_master_2026` (from env)

### 5. Running the Project
You can run both frontend and backend simultaneously:
```bash
npm run dev
```

Or run them individually:
- Frontend: `npm run dev:frontend` (http://localhost:3000)
- Backend: `npm run dev:backend` (http://localhost:5001)

## 🚀 Deployment

### Frontend (Vercel)
1. Deploy from `frontend/` directory or set root to `frontend` in Vercel.
2. Set env vars: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `MONGODB_URI`, `NEXT_PUBLIC_API_URL` (your backend URL).
3. Build command: `npm run build`

### Backend (Railway/Render/Heroku)
1. Set root to `backend/`.
2. Env vars: `MONGODB_URI`, `JWT_SECRET`, `OPENAI_API_KEY` or `GEMINI_API_KEY`, `FRONTEND_URL` (your frontend URL).
3. Start: `npm run dev` or `npm start` (after build).

### Production checklist
- Set `NEXT_PUBLIC_API_URL` in frontend to your deployed backend URL.
- Set `FRONTEND_URL` in backend to your deployed frontend URL.
- Use MongoDB Atlas or managed MongoDB for production.
- Keep API keys in env vars only, never in code.

## 🛡 License
MIT License


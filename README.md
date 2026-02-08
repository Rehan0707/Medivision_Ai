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

### 2. Installation
From the root directory, run:
```bash
npm install
```

### 3. Running the Project
You can run both frontend and backend simultaneously:
```bash
npm run dev
```

Or run them individually:
- Frontend: `npm run dev:frontend`
- Backend: `npm run dev:backend`

## 🛡 License
MIT License


# Busify-College-Bus-Portal
A real-time college shuttle tracking application for students and drivers, featuring live GPS tracking, AI-powered ETA predictions, and centralized communication for route changes.

# Busify - College Bus Tracker

A real-time tracking application built with **React**, **TypeScript**, and **Python**.

## 🚀 Features
- **Live Tracking**: Interactive Leaflet maps for student views.
- **AI-Powered ETA**: Uses Google Gemini to predict arrival times.
- **Python Backend Logic**: Specialized route optimization in `eta_calculator.py`.

## 🛠️ Getting Started (From your end)

### 1. Set up GitHub Secrets
Go to your repo **Settings > Secrets and variables > Actions** and add:
- `API_KEY`: Your Gemini API Key.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```

### 4. Run Python Logic
To verify the ETA logic used by the simulation:
```bash
python eta_calculator.py
```

## 🏗️ Architecture
- **Frontend**: Vite + React 19 + Tailwind CSS.
- **Map**: Leaflet.js.
- **Intelligence**: Google Gemini API via `@google/genai`.
- **Logic**: Python 3.10 modules.

---
Built by Farhana Khan (23BCON1978)

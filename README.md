# 🌐 Chaincast

Chaincast is a unified platform that connects multiple blockchain apps and provides **real-time crypto insights** — without the need for constant frontend polling.  
Get live updates across all your devices and receive instant notifications through your favorite apps like **Telegram, WhatsApp, Discord**, and **Email**.

---



## 🏗️ Architecture
<img width="1482" height="846" alt="Screenshot 2025-10-31 at 10 09 53 AM (1)" src="https://github.com/user-attachments/assets/99183508-e7af-445e-81b8-0d81f51a3617" />




## 🚀 Features (v0)

### 💻 Devices
Access your crypto insights from **smartphones**, **tablets**, and **desktops** seamlessly — your data stays in sync everywhere.

### ⚡ Real-Time Updates
Say goodbye to frontend polling.  
Chaincast delivers **instant, reliable transaction updates** the moment they’re confirmed on-chain.

### 🔔 Notifications
Get notified instantly through:
- **Telegram**
- **WhatsApp**
- **Discord**
- **Email**

---

## 🧠 Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- TailwindCSS

**Backend:**
- Node.js + Express
- TypeScript
- WebSockets for real-time updates
- MongoDB for data storage

**Infra & Integrations:**
- Render / Vercel (Deployment)
- Helius / Blockchain APIs (Data Sources)
- Telegram / Discord / Email Webhooks (Notifications)

---




This diagram should illustrate:
- Data flow between frontend ↔ backend ↔ blockchain APIs  
- WebSocket and webhook communication channels  
- Notification delivery services  

---

## ⚙️ Setup & Installation

### Prerequisites
Make sure you have:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- Access to environment variables (see `.env.example`)

### Steps
```bash
# Clone the repo
git clone https://github.com/<your-username>/chaincast.git

# Navigate into the project
cd chaincast

# Install dependencies
npm install

# Run the development server
npm run dev

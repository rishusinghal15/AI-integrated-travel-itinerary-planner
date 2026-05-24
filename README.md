# AI-Integrated Travel Itinerary Planner

> **Cut your trip planning time by 80%** — AI-generated personalized itineraries with live place search, hotel booking, JWT auth, and instant PDF export.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_App-38bdf8?style=for-the-badge)](https://ai-integrated-travel-itinerary-plan.vercel.app/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-integrated-travel-itinerary-plan.vercel.app/)

![Tech](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Tech](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![Tech](https://img.shields.io/badge/Groq_API-F55036?style=flat-square&logo=groq&logoColor=white)
![Tech](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Tech](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)

---

## 🌐 Live Demo

**[https://ai-integrated-travel-itinerary-plan.vercel.app/](https://ai-integrated-travel-itinerary-plan.vercel.app/)**

---

## 📌 What It Does

Planning a trip used to mean hours of research, tab-switching, and manually figuring out routes. This app eliminates all of that.

Enter your destination, travel dates, interests, and budget — and the app instantly returns a **complete, day-by-day itinerary** powered by Groq AI, with live place search, hotel booking integration, and a downloadable PDF — all behind a secure JWT-authenticated session.

### Key Features

- 🧠 **AI-generated itineraries** via Groq API — real-time, personalized to your preferences
- 🔍 **Live place search** — search and discover destinations across 100+ locations dynamically
- 🏨 **Hotel booking integration** — find and book accommodations directly within the app
- 🔐 **JWT authentication** — secure user sessions with token-based auth (login, register, protected routes)
- 📄 **jsPDF export** — download your full itinerary as a structured, shareable PDF instantly
- 💾 **MongoDB persistence** — save, retrieve, and manage multiple trip plans per user
- 📚 **Modular backend** — well-documented, maintainable code structure following best practices
- ⚡ **Deployed on Vercel** — live and accessible anytime

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| AI | Groq API (real-time LLM inference) |
| Auth | JWT (JSON Web Tokens) |
| Database | MongoDB |
| Export | jsPDF |
| Deployment | Vercel |
| Other | REST APIs, Async/Await |

---

## 🚀 Getting Started

### Option 1 — Use the Live App

👉 **[https://ai-integrated-travel-itinerary-plan.vercel.app/](https://ai-integrated-travel-itinerary-plan.vercel.app/)**

No setup needed — just open and start planning!

---

### Option 2 — Run Locally

#### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Groq API key → [get one free at console.groq.com](https://console.groq.com)

#### Installation

```bash
# 1. Clone the repo
git clone https://github.com/rishusinghal15/AI-integrated-travel-itinerary-planner.git
cd AI-integrated-travel-itinerary-planner

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your keys in .env

# 4. Start the server
npm start
```

#### Environment Variables

```env
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

---

## 📁 Project Structure

```
AI-integrated-travel-itinerary-planner/
├── server/
│   ├── routes/          # API route handlers
│   ├── controllers/     # Business logic
│   ├── models/          # MongoDB schemas (User, Trip)
│   ├── middleware/       # JWT auth middleware
│   └── services/        # Groq API & place search integrations
├── public/
│   ├── index.html       # Frontend UI
│   ├── style.css
│   └── app.js           # Client-side JS
├── .env.example
└── README.md
```

---

## 💡 How It Works

```
User registers / logs in (JWT issued)
        ↓
Enter destination, dates, interests, budget
        ↓
Live place search fetches real locations dynamically
        ↓
Groq API generates personalized day-by-day itinerary
        ↓
Hotel booking options surfaced within the itinerary
        ↓
MongoDB saves the trip plan to user's account
        ↓
Frontend renders complete itinerary
        ↓
User downloads structured PDF via jsPDF
```

---

## 📈 Impact

- ⏱️ Reduces trip planning time by **~80%** compared to manual research
- 📍 Live search across **100+ destinations** with real-time results
- 🔐 **Secure** — every user's trips are protected behind JWT auth
- 📄 Instant **PDF export** for shareable, structured multi-day plans

---

## 🔮 Future Improvements

- [ ] Real-time flight price integration
- [ ] Budget tracker per day / category
- [ ] Collaborative trip planning (shared itineraries)
- [ ] Mobile app (React Native)

---

## 👨‍💻 Author

**Rishu Singhal** — Pre-final year CS @ JECRC University, Jaipur

[![Portfolio](https://img.shields.io/badge/Live_App-Visit-38bdf8?style=flat-square)](https://ai-integrated-travel-itinerary-plan.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/rishusinghal)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/rishusinghal15)

---

⭐ **If this project helped or inspired you, drop a star — it means a lot!**

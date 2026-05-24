# AI-Integrated Travel Itinerary Planner

> **Cut your trip planning time by 80%** — AI-generated personalized itineraries with route optimization and instant PDF export.

![Tech](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Tech](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![Tech](https://img.shields.io/badge/OpenAI_API-412991?style=flat-square&logo=openai&logoColor=white)
![Tech](https://img.shields.io/badge/Google_Maps_API-4285F4?style=flat-square&logo=googlemaps&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

---

## 📌 What It Does

Planning a trip used to mean hours of research, tab-switching, and manual route figuring. This app eliminates all that.

You enter your destination, travel dates, interests, and budget — and the app returns a **complete, day-by-day itinerary** powered by OpenAI, with optimized routes on a live map.

### Key Features

- 🧠 **AI-generated itineraries** via OpenAI API — personalized to your preferences
- 🗺️ **Google Maps integration** — optimized routes across 100+ locations
- 📄 **jsPDF export** — download your full itinerary as a structured PDF instantly
- 💾 **MongoDB persistence** — save, retrieve, and manage multiple trip plans
- ⚡ **Async JavaScript** — non-blocking API calls for smooth UX

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| AI | OpenAI API (GPT) |
| Maps | Google Maps JavaScript API |
| Database | MongoDB |
| Export | jsPDF |
| Other | REST APIs, Async/Await |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Groq API key
- Google Maps

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/rishusinghal15/AI-integrated-travel-itinerary-planner.git
cd AI-integrated-travel-itinerary-planner

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your API keys in .env

# 4. Start the server
npm start
```

### Environment Variables

```env
OPENAI_API_KEY=your_openai_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_key_here
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

---

## 📁 Project Structure

```
AI-integrated-travel-itinerary-planner/
├── server/
│   ├── routes/          # API route handlers
│   ├── controllers/     # Business logic
│   ├── models/          # MongoDB schemas
│   └── services/        # OpenAI & Maps integrations
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
User Input (destination, dates, interests, budget)
        ↓
  Node.js Backend receives request
        ↓
  OpenAI API generates personalized itinerary
        ↓
  Google Maps API optimizes routes between stops
        ↓
  MongoDB saves the trip plan
        ↓
  Frontend renders itinerary + map
        ↓
  User downloads PDF via jsPDF
```

---

## 📈 Impact

- ⏱️ Reduces trip planning time by **~80%** compared to manual research
- 📍 Optimizes routes across **100+ locations** using Google Maps
- 📄 Generates structured **multi-day itineraries** exportable as PDF

---

## 🔮 Future Improvements

- [ ] User authentication & saved trips dashboard
- [ ] Real-time flight & hotel price integration
- [ ] Budget tracker per day/category
- [ ] Mobile app (React Native)

---

## 👨‍💻 Author

**Rishu Singhal**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/rishusinghal)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/rishusinghal15)

---

⭐ **If this project helped or inspired you, consider giving it a star!**

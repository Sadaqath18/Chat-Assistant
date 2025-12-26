# 🤖 GeekSpoc Rule-Based Chat Assistat

A **custom-built conversational chat assistant** developed using **Node.js and Express**, designed to automate user engagement, capture high-quality leads, and seamlessly connect users to human experts via **WhatsApp**.

This project is fully self-hosted, framework-independent on the frontend, and integrates cleanly with **WordPress** or any static/dynamic website via a lightweight embed script.

---

## 🚀 Project Overview

The GeekSpoc Chat Assistant serves as a **24/7 virtual assistant** for the GeekSpoc website, helping visitors:

- Explore 🎓 Training Programs
- Discover 💼 IT Services
- Request 🧠 Free Consultation
- Find 📍 Location & Contact details

Before providing detailed information, the bot intelligently **captures lead details**, ensuring only **high-intent users** are passed to human teams.

---

## ❓ Problem It Solves

- Manual handling of website inquiries is time-consuming
- Leads often lack context or intent clarity
- Users drop off without human follow-up
- Third-party chatbots limit customization and data ownership

---

## ✅ Solution

A **custom Node.js chatbot** that:

- Guides users with structured conversation flows
- Captures verified leads before deep engagement
- Stores leads securely on the backend
- Redirects qualified users to WhatsApp with full context
- Works seamlessly inside WordPress without plugins

---

## ✨ Key Features

### 🧠 Smart Conversation Flow
- Auto greeting on first open
- Button-based guided navigation
- Session-aware (no repeated greetings)
- Context preserved across steps

---

### 🎓 Training Programs Flow
- Full-Stack Development  
- AI & Machine Learning  
- Cybersecurity  
- Lead capture before program details
- CTA to explore more courses or WhatsApp

---

### 💼 IT Services Flow
- Website Development  
- Mobile App Development  
- Digital Marketing  
- IT Consultation  
- Service-specific responses after lead capture

---

### 📝 Lead Capture System
- Captures:
  - Name
  - Phone Number
  - Background (Student / Professional / Career Switcher)
- Lead form shown **only once per session**
- Prevents duplicate or repeated prompts

---

### 💾 Lead Persistence
- Leads stored in backend JSON storage
- Includes:
  - Timestamp
  - User interest
  - Flow type (Training / Service)
- Easily extendable to databases or CRM tools

---

### 📲 WhatsApp Integration
- One-click WhatsApp redirection
- Personalized messages including:
  - User name
  - Background
  - Selected course or service
- Separate messaging for Training vs Services

---

### 🛠 Admin API
- Fetch all leads via API:

A production-ready rule-based chatbot built for the GeekSpoc website.

## Features
- Auto greeting on chat open
- Button-driven rule-based conversation flow
- Training & IT services inquiry handling
- Lead capture ready
- WhatsApp handoff support
- Node.js + Express backend
- Vanilla JS frontend widget
----
## 🧰 Tech Stack

### Backend
- Node.js
- Express.js
- CORS Middleware
- File-based JSON storage

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Integration
- WordPress (footer embed)
- WhatsApp Click-to-Chat

---

## 📂 Project Structure

/server
│── server.cjs
│
/public
│── index.html
│── widget.js
│── widget.css
│── assets/
│ └── geekspoc-logo.png
│
/data
│── leads.json
│
README.md

yaml
Copy code

---

## ⚙️ Setup & Run Locally

1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/geekspoc-chat-assistant.git
cd geekspoc-chat-assistant
```

2️⃣ Install dependencies

bash
Copy code
npm install
3️⃣ Start the server

bash
Copy code
npm start
4️⃣ Open in browser

arduino
Copy code
http://localhost:3000
## Setup Instructions

```bash
git clone https://github.com/<Sadaqath18>/geekspoc-chatbot.git
cd geekspoc-chatbot
npm install
```


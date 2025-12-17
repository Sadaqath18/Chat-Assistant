const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/chat", (req, res) => {
  const msg = (req.body.message || "").toLowerCase();
  const state = req.body.state || "GREETING";

  /* ---------------- GREETING ---------------- */
  if (state === "GREETING") {
    return res.json({
      text:
        "👋 Hi! Welcome to GeekSpoc.\n\nWe help individuals build strong tech careers and help businesses grow with reliable IT solutions.\n\nHow can I help you today?",
      options: [
        "🎓 Training Programs",
        "💼 IT Services",
        "📍 Location & Contact"
      ],
      nextState: "ROOT"
    });
  }

  /* ---------------- ROOT ---------------- */
  if (state === "ROOT") {
    if (msg.includes("training")) {
      return res.json({
        text:
          "We offer industry-focused training programs designed for real-world roles and placement support.",
        options: [
          "Full-Stack Development",
          "AI & Machine Learning",
          "Cybersecurity"
        ],
        nextState: "TRAINING"
      });
    }

    if (msg.includes("service")) {
      return res.json({
        text:
          "GeekSpoc provides end-to-end IT services for startups, SMEs, and enterprises.",
        options: [
          "Website Development",
          "Mobile App Development",
          "Digital Marketing",
          "IT Consulting / Staff Augmentation"
        ],
        nextState: "SERVICES"
      });
    }

    if (msg.includes("location") || msg.includes("contact")) {
      return res.json({
        text:
          "📍 Our office and training center is located in *Hennur, Kalyan Nagar, Bangalore*.",
        options: ["📍 View on Google Maps", "📞 Contact Us"],
        nextState: "LOCATION"
      });
    }
  }

  /* ---------------- TRAINING ---------------- */
  if (state === "TRAINING") {
    if (
      msg.includes("full") ||
      msg.includes("ai") ||
      msg.includes("cyber")
    ) {
      return res.json({
        text:
          "Great choice 👍\n\nTo guide you better, may I know your *name* and *mobile number*?\nOur career expert will assist you with next steps.",
        nextState: "LEAD_CAPTURE"
      });
    }
  }

  /* ---------------- FALLBACK ---------------- */
  return res.json({
    text:
      "That’s a great question 👍\nOur expert can explain this better. Would you like to continue on WhatsApp?",
    options: ["💬 Continue on WhatsApp"],
    nextState: "FALLBACK"
  });
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});

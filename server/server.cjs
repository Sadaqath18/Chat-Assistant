const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const INTENTS = {
  GREETING: {
    message:
      "👋 Hi! Welcome to GeekSpoc.\n\nWe help individuals build strong tech careers and help businesses grow with reliable IT solutions.\n\nHow can I help you today?",
    quick_replies: [
      "🎓 Training Programs",
      "💼 IT Services",
      "🧠 Free Consultation",
      "📍 Location & Contact",
    ],
    nextState: "ROOT",
  },

  TRAINING_ENTRY: {
    message:
      "We offer industry-focused training programs designed for real-world roles and placement support.",
    quick_replies: [
      "Full-Stack Development",
      "AI & Machine Learning",
      "Cybersecurity",
    ],
    nextState: "POST_INFO",
  },

  //COURSE INFO

  FULLSTACK_INFO: {
    message:
      "Full-Stack Development covers modern web dev including frontend, backend, databases, cloud deployment, and real-world projects.\n\n👉 Please visit our website for detailed course structure.",
    quick_replies: ["🎓 Explore Other Courses", "💼 IT Services"],
    nextState: "POST_INFO",
  },

  AIML_INFO: {
    message:
      "AI/ML Covers Python, ML, GenAI basics, and real AI projects.\n\n👉 Visit our website for complete curriculum.",
    quick_replies: ["🎓 Explore Other Courses", "💼 IT Services"],
    nextState: "POST_INFO",
  },

  CYBER_INFO: {
    message:
      "Cybersecurity includes Networking basics, SOC operations, SIEM, incident response, and cloud security.\n\n👉 Visit our website for full syllabus.",
    quick_replies: ["🎓 Explore Other Courses", "💼 IT Services"],
    nextState: "POST_INFO",
  },

  // SERVICES

  SERVICES_ENTRY: {
    message:
      "💼 We provide end-to-end IT services for startups, SMEs, and enterprises including:",
    quick_replies: [
      "🌐 Website Development",
      "📱 Mobile App Development",
      "📈 Digital Marketing",
      "🧠 IT Consultation",
    ],
    nextState: "SERVICES_LEAD",
  },

  WEBSITE_DEV: {
    message:
      "We design and develop fast, responsive, and SEO-optimized websites for startups, SMEs, and enterprises.",
    quick_replies: ["💼 Explore Other Services"],
    nextState: "POST_INFO",
  },

  MOBILE_APP_DEV: {
    message:
      "We build user-friendly mobile applications for Android and iOS platforms to help you reach a wider audience.",
    quick_replies: ["💼 Explore Other Services"],
    nextState: "POST_INFO",
  },

  DIGITAL_MARKETING: {
    message:
      "Our digital marketing services include SEO, SEM, Meta Ads, social media marketing, and lead generation to boost your online presence.",
    quick_replies: ["💼 Explore Other Services"],
    nextState: "POST_INFO",
  },

  IT_CONSULTATION: {
    message:
      "We offer expert IT consultation for startups and businesses to plan, optimize, and scale their technology.",
    quick_replies: ["Book free consultation call"],
    nextState: "POST_INFO",
  },

  LOCATION: {
    message: "📍 Our office is located in Hennur, Kalyan Nagar, Bangalore.",
    quick_replies: ["📍 View on Google Maps", " Contact Us"],
    nextState: "POST_INFO",
  },

  FALLBACK: {
    message:
      "Our expert can help you better with this.\nWould you like us to assist you on WhatsApp?",
    quick_replies: ["💬 Continue on WhatsApp"],
    nextState: "END",
  },
};

const BUTTON_MAP = {
  // ENTRY
  "🎓 Training Programs": { intent: "TRAINING_ENTRY", flowType: "TRAINING" },
  "💼 IT Services": { intent: "SERVICES_ENTRY", flowType: "SERVICE" },

  // TRAINING COURSES
  "Full-Stack Development": { intent: "COURSE", flowType: "TRAINING" },
  "AI & Machine Learning": { intent: "COURSE", flowType: "TRAINING" },
  Cybersecurity: { intent: "COURSE", flowType: "TRAINING" },
  "🎓 Explore Other Courses": {
    intent: "TRAINING_ENTRY",
    flowType: "TRAINING",
  },

  // SERVICES
  "🌐 Website Development": { intent: "SERVICE_ITEM", flowType: "SERVICE" },
  "📱 Mobile App Development": { intent: "SERVICE_ITEM", flowType: "SERVICE" },
  "📈 Digital Marketing": { intent: "SERVICE_ITEM", flowType: "SERVICE" },
  "🧠 IT Consultation": { intent: "SERVICE_ITEM", flowType: "SERVICE" },
  "💼 Explore Other Services": {
    intent: "SERVICES_ENTRY",
    flowType: "SERVICE",
  },

  "📍 Location & Contact": { intent: "LOCATION" },
  "🧠 Free Consultation": { intent: "FALLBACK" },
};

/* ---------------- CHAT API ---------------- */

app.post("/chat", (req, res) => {
  const { message = "", state = "GREETING", meta = {} } = req.body;

  // Auto greeting
  if (!message && state === "GREETING") {
    return res.json(INTENTS.GREETING);
  }

  // AFTER LEAD SUBMISSION
  if (state === "LEAD_SUBMIT") {
    const sel = meta.selection || "";
    const flowType = meta.flowType || "";

    if (flowType === "TRAINING") {
      if (sel.includes("Full")) return res.json(INTENTS.FULLSTACK_INFO);
      if (sel.includes("AI")) return res.json(INTENTS.AIML_INFO);
      if (sel.includes("Cyber")) return res.json(INTENTS.CYBER_INFO);
    }

    if (flowType === "SERVICE") {
      if (sel.includes("Website")) return res.json(INTENTS.WEBSITE_DEV);
      if (sel.includes("Mobile")) return res.json(INTENTS.MOBILE_APP_DEV);
      if (sel.includes("Digital")) return res.json(INTENTS.DIGITAL_MARKETING);
      if (sel.includes("Consult")) return res.json(INTENTS.IT_CONSULTATION);
    }

    // Safety fallback (should never hit now)
    return res.json(INTENTS.FALLBACK);
  }

  // BUTTON ROUTING
  if (BUTTON_MAP[message]) {
    const { intent, flowType } = BUTTON_MAP[message];

    // Trigger lead form ONCE for training/services
    if (
      (intent === "COURSE" || intent === "SERVICE_ITEM") &&
      !meta.leadSubmitted
    ) {
      return res.json({
        message:
          "Great choice 👍\n\nBefore we proceed, please share your details and our team will assist you shortly.",
        showForm: true,
        nextState: "LEAD_SUBMIT",
        meta: {
          flowType,
        },
      });
    }

    // Direct routing AFTER lead
    if (intent === "COURSE") {
      if (message.includes("Full")) return res.json(INTENTS.FULLSTACK_INFO);
      if (message.includes("AI")) return res.json(INTENTS.AIML_INFO);
      if (message.includes("Cyber")) return res.json(INTENTS.CYBER_INFO);
    }

    if (intent === "SERVICE_ITEM") {
      if (message.includes("Website")) return res.json(INTENTS.WEBSITE_DEV);
      if (message.includes("Mobile")) return res.json(INTENTS.MOBILE_APP_DEV);
      if (message.includes("Digital"))
        return res.json(INTENTS.DIGITAL_MARKETING);
      if (message.includes("Consult")) return res.json(INTENTS.IT_CONSULTATION);
    }

    return res.json(INTENTS[intent]);
  }

  return res.json(INTENTS.FALLBACK);
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});

document.addEventListener("DOMContentLoaded", () => {
  const pill = document.getElementById("ask-pill");
  const chatbox = document.getElementById("chatbox");
  const closeBtn = document.getElementById("close-chat");
  const content = document.getElementById("chat-content");
  const input = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  let chatState = "GREETING";
  let greetedOnce = false;
  let leadSubmitted = false;

  let selectedOption = ""; // stores course or service
  let flowType = ""; // TRAINING | SERVICE

  let leadData = {
    // stores lead details
    name: "",
    phone: "",
    background: "",
  };

  /* ================= OPEN CHAT ================= */

  pill.onclick = () => {
    chatbox.classList.add("active");
    pill.style.display = "none";

    if (!greetedOnce) {
      fetchResponse("", "GREETING");
      greetedOnce = true;
    }
  };

  /* SEND MESSAGE */
  function sendManualMessage() {
    const text = input.value.trim();
    if (!text) return;

    fetchResponse(text, chatState, {
      selection: text,
      flowType,
      leadSubmitted,
      lead: leadData,
    });

    input.value = "";
  }

  /* Send button click */
  sendBtn.onclick = sendManualMessage;

  /* Enter key support */
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendManualMessage();
  });

  /* ================= CLOSE CHAT ================= */

  closeBtn.onclick = () => {
    chatbox.classList.remove("active");
    pill.style.display = "flex";
  };

  /* ================= FETCH RESPONSE ================= */

  function fetchResponse(message, state, meta = {}) {
    if (message) addMessage(message, "user");

    showTyping();

    fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, state, meta }),
    })
      .then((res) => res.json())
      .then((data) => {
        hideTyping();

        if (data.redirect) {
          window.open(data.redirect, "_blank");
          return;
        }

        if (data.message) addMessage(data.message, "bot");

        if (data.showForm && !leadSubmitted) {
          flowType = data.meta?.flowType || "";
          addLeadForm();
          return;
        }

        if (data.quick_replies) addOptions(data.quick_replies);
        if (data.nextState) chatState = data.nextState;
      })
      .catch((err) => console.error("Chat error:", err));
  }

  /* ================= UI HELPERS ================= */

  function showTyping() {
    const typing = document.createElement("div");
    typing.className = "bot typing";
    typing.id = "typing-indicator";
    typing.innerHTML = "Geekspoc is typing...";
    content.appendChild(typing);
    content.scrollTop = content.scrollHeight;
  }

  function hideTyping() {
    const typing = document.getElementById("typing-indicator");
    if (typing) typing.remove();
  }

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = type;
    div.innerText = text;
    content.appendChild(div);
    content.scrollTop = content.scrollHeight;
  }

  /* ================= OPTIONS ================= */

  function addOptions(options) {
    options.forEach((opt) => {
      const btn = document.createElement("div");
      btn.className = "option";
      btn.innerText = opt;

      btn.onclick = () => {
        // ✅ Update selection ONLY for courses/services

        if (
          opt.includes("Full") ||
          opt.includes("AI") ||
          opt.includes("Cyber") ||
          opt.includes("Training")
        ) {
          selectedOption = opt;
          flowType = "TRAINING";
        }
        if (
          opt.includes("Website") ||
          opt.includes("Mobile") ||
          opt.includes("Digital") ||
          opt.includes("Consult") ||
          opt.includes("Service")
        ) {
          selectedOption = opt;
          flowType = "SERVICE";
        }

        fetchResponse(opt, chatState, {
          selection: selectedOption,
          flowType,
          leadSubmitted,
          lead: leadData,
        });
      };

      content.appendChild(btn);
    });
  }

  /* ================= LEAD FORM ================= */

  function addLeadForm() {
    leadSubmitted = true;

    const form = document.createElement("div");
    form.className = "lead-form";

    form.innerHTML = `
      <div class="form-title">Let’s get your details</div>
      <input id="lead-name" placeholder="Your Name" />
      <input id="lead-phone" placeholder="Mobile Number" />
      <select id="lead-bg">
        <option value="">Your Background</option>
        <option>Student / Fresher</option>
        <option>Working Professional</option>
        <option>Career Switcher</option>
      </select>
      <button class="submit-btn">Submit</button>
    `;

    form.querySelector(".submit-btn").onclick = () => {
      const name = document.getElementById("lead-name").value.trim();
      const phone = document.getElementById("lead-phone").value.trim();
      const bg = document.getElementById("lead-bg").value;

      if (!name || phone.length < 10 || !bg) {
        alert("Please fill all details correctly");
        return;
      }

      leadData = { name, phone, background: bg };
      leadSubmitted = true;

      addMessage(`Name: ${name}\nPhone: ${phone}\nBackground: ${bg}`, "user");

      fetchResponse("", "LEAD_SUBMIT", {
        selection: selectedOption,
        flowType,
        leadSubmitted: true,
        lead: leadData,
      });
    };

    content.appendChild(form);
  }
});

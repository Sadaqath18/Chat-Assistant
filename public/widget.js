document.addEventListener("DOMContentLoaded", () => {
  const pill = document.getElementById("ask-pill");
  const chatbox = document.getElementById("chatbox");
  const closeBtn = document.getElementById("close-chat");
  const content = document.getElementById("chat-content");

  let chatState = "GREETING";
  let greetedOnce = false;
  let leadSubmitted = false;

  let selectedOption = ""; // stores course or service
  let flowType = ""; // TRAINING | SERVICE

  /* ================= OPEN CHAT ================= */

  pill.onclick = () => {
    chatbox.classList.add("active");
    pill.style.display = "none";

    if (!greetedOnce) {
      fetchResponse("", "GREETING");
      greetedOnce = true;
    }
  };

  /* ================= CLOSE CHAT ================= */

  closeBtn.onclick = () => {
    chatbox.classList.remove("active");
    pill.style.display = "flex";
  };

  /* ================= FETCH RESPONSE ================= */

  function fetchResponse(message, state, meta = {}) {
    if (message) addMessage(message, "user");

    fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, state, meta }),
    })
      .then((res) => res.json())
      .then((data) => {
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
        selectedOption = opt;

        fetchResponse(opt, chatState, {
          selection: selectedOption,
          flowType,
          leadSubmitted,
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

      addMessage(`Name: ${name}\nPhone: ${phone}\nBackground: ${bg}`, "user");

      fetchResponse("", "LEAD_SUBMIT", {
        selection: selectedOption,
        flowType,
        leadSubmitted: true,
        lead: { name, phone, bg },
      });
    };

    content.appendChild(form);
  }
});

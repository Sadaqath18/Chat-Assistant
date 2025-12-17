document.addEventListener("DOMContentLoaded", () => {
  const pill = document.getElementById("ask-pill");
  const chatbox = document.getElementById("chatbox");
  const closeBtn = document.getElementById("close-chat");
  const content = document.getElementById("chat-content");
  const input = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  let chatState = "GREETING";

  if (!pill || !chatbox) {
    console.error("❌ Chatbot elements not found");
    return;
  }

  pill.onclick = () => {
    console.log("✅ Pill clicked");

    chatbox.classList.remove("hidden");
    pill.style.display = "none";

    content.innerHTML = "";
    chatState = "GREETING";

    fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "", state: "GREETING" }),
    })
      .then((res) => res.json())
      .then((data) => {
         addMessage(data.text, "bot");
         addOptions(data.options);
        chatState = data.nextState;
      })
      .catch((err) => console.error("❌ Init chat error:", err));
  };

  closeBtn.onclick = () => {
    chatbox.classList.add("hidden");
    pill.style.display = "flex";
  };

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = type;
    div.innerText = text;
    content.appendChild(div);
    content.scrollTop = content.scrollHeight;
  }

  function clearOptions() {
    document.querySelectorAll(".option").forEach((o) => o.remove());
  }

  function addOptions(options) {
    clearOptions();
    options.forEach((opt) => {
      const btn = document.createElement("div");
      btn.className = "option";
      btn.innerText = opt;
      btn.onclick = () => send(opt);
      content.appendChild(btn);
    });
  }

  function send(message) {
    if (message) addMessage(message, "user");
    clearOptions();

    fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, state: chatState }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.text) addMessage(data.text, "bot");
        if (data.options) addOptions(data.options);
        if (data.nextState) chatState = data.nextState;
      });
  }

  sendBtn.onclick = () => {
    if (!input.value.trim()) return;
    send(input.value);
    input.value = "";
  };

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.onclick();
  });
});

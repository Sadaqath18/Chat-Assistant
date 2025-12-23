(function () {
  if (window.__GEEK_SPOC_CHAT_LOADED__) return;
  window.__GEEK_SPOC_CHAT_LOADED__ = true;

  // Load CSS
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "https://chat-assistant-9d2y.onrender.com/widget.css";
  document.head.appendChild(css);

  // Load Widget JS
  const script = document.createElement("script");
  script.src = "https://chat-assistant-9d2y.onrender.com/widget.js";
  script.defer = true;
  document.body.appendChild(script);
})();

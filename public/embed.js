(function () {
  if (window.__GEEK_SPOC_CHAT_LOADED__) return;
  window.__GEEK_SPOC_CHAT_LOADED__ = true;

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "https://your-url.onrender.com/widget.css";
  document.head.appendChild(css);

  const container = document.createElement("div");
  container.id = "geekspoc-chat-root";
  document.body.appendChild(container);

  const script = document.createElement("script");
  script.src = "https://your-url.onrender.com/chat-widget-runtime.js";
  script.defer = true;
  document.body.appendChild(script);
})();

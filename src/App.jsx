import { useState, useRef, useEffect } from "react";
import "./App.css";

const SCENE_BUTTONS = [
  { emoji: "🍜", label: "Dining", query: "What are the dining etiquette rules in Japan?" },
  { emoji: "🚃", label: "Train", query: "What are the rules and etiquette on Japanese trains?" },
  { emoji: "♨️", label: "Onsen", query: "How do I use a Japanese onsen properly?" },
  { emoji: "🏯", label: "Sightseeing", query: "What should I know when visiting Japanese temples and shrines?" },
  { emoji: "💼", label: "Business", query: "What are the business etiquette rules in Japan?" },
];

const DAILY_LIMIT = 5;

function getDailyCount() {
  const today = new Date().toDateString();
  const stored = JSON.parse(localStorage.getItem("woj_usage") || "{}");
  if (stored.date !== today) return 0;
  return stored.count || 0;
}

function incrementDailyCount() {
  const today = new Date().toDateString();
  const count = getDailyCount() + 1;
  localStorage.setItem("woj_usage", JSON.stringify({ date: today, count }));
  return count;
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Konnichiwa! 🌸 I'm Kokoro, your Japanese culture guide. Ask me anything about Japan — customs, food, travel tips, and more! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("quick");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [dailyCount, setDailyCount] = useState(getDailyCount());
  const [showPaywall, setShowPaywall] = useState(false);
  const [screen, setScreen] = useState("chat");
  const [useReal, setUseReal] = useState(false);
  const bottomRef = useRef(null);

  const kokoroImg = useReal ? "/images/kokoro-real.png" : "/images/kokoro-chibi.png";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText) return;

    if (mode === "quick" && dailyCount >= DAILY_LIMIT) {
      setShowPaywall(true);
      return;
    }

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const count = incrementDailyCount();
    setDailyCount(count);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, mode, language }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't understand that. Please try again!";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Gomen nasai! Something went wrong. Please try again 🙏" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1 className="header-title">Way of Japan</h1>
          <p className="header-subtitle">Your Cultural Guide 🌸</p>
        </div>
        <select className="lang-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">🇺🇸 EN</option>
          <option value="zh">🇨🇳 ZH</option>
          <option value="ko">🇰🇷 KO</option>
        </select>
      </header>

      {/* Mode Toggle */}
      <div className="mode-toggle">
        <button className={`mode-btn ${mode === "quick" ? "active" : ""}`} onClick={() => setMode("quick")}>
          🌸 Quick
        </button>
        <button className={`mode-btn ${mode === "deep" ? "active" : ""}`} onClick={() => setMode("deep")}>
          🍵 Deep
        </button>
        <button className={`mode-btn ${screen === "camera" ? "active" : ""}`} onClick={() => setScreen(screen === "camera" ? "chat" : "camera")}>
          📷 Translate
        </button>
        <button className={`mode-btn ${useReal ? "active" : ""}`} onClick={() => setUseReal(!useReal)}>
          {useReal ? "👘 Real" : "🎎 Chibi"}
        </button>
      </div>

      {screen === "chat" ? (
        <>
          {/* Scene Buttons */}
          <div className="scene-buttons">
            {SCENE_BUTTONS.map((s) => (
              <button key={s.label} className="scene-btn" onClick={() => sendMessage(s.query)}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>

          {/* Chat + Kokoro */}
          <div className="chat-wrapper">
            {/* Chat messages */}
            <div className="chat-area">
              {messages.map((msg, i) => (
                <div key={i} className={`message-row ${msg.role}`}>
                  <div className={`bubble ${msg.role}`}>{msg.content}</div>
                </div>
              ))}
              {loading && (
                <div className="message-row assistant">
                  <div className="bubble assistant typing">Kokoro is thinking... 🌸</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Kokoro fixed bottom left */}
            <div className="kokoro-fixed">
              <img src={kokoroImg} alt="Kokoro" className="kokoro-img" />
            </div>
          </div>

          {/* Usage counter */}
          {mode === "quick" && (
            <div className="usage-bar">
              Free: {DAILY_LIMIT - dailyCount} / {DAILY_LIMIT} messages left today
            </div>
          )}

          {/* Input */}
          <div className="input-area">
            <input
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask Kokoro anything about Japan..."
            />
            <button className="send-btn" onClick={() => sendMessage()}>Send</button>
          </div>
        </>
      ) : (
        <CameraScreen language={language} setScreen={setScreen} setMessages={setMessages} messages={messages} />
      )}

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="modal-overlay" onClick={() => setShowPaywall(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src="/images/kokoro-chibi.png" alt="Kokoro" className="modal-chibi" />
            <h2>Daily limit reached! 🌸</h2>
            <p>You've used all 5 free messages for today.</p>
            <div className="modal-plans">
              <div className="plan">
                <div className="plan-name">Weekly Pass</div>
                <div className="plan-price">$3.99</div>
                <div className="plan-desc">Unlimited for 7 days</div>
                <button className="plan-btn">Get Weekly Pass</button>
              </div>
              <div className="plan featured">
                <div className="plan-name">Monthly</div>
                <div className="plan-price">$4.99</div>
                <div className="plan-desc">Unlimited + Deep mode</div>
                <button className="plan-btn">Get Monthly</button>
              </div>
            </div>
            <button className="modal-close" onClick={() => setShowPaywall(false)}>Maybe later</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CameraScreen({ language, setScreen, setMessages, messages }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [captured, setCaptured] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      videoRef.current.srcObject = stream;
      setStreaming(true);
    } catch {
      alert("Camera access denied. Please allow camera access.");
    }
  }

  function capture() {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const base64 = canvas.toDataURL("image/jpeg", 0.8).split(",")[1];
    setCaptured(base64);
    video.srcObject?.getTracks().forEach((t) => t.stop());
    setStreaming(false);
  }

  async function analyze() {
    if (!captured) return;
    setAnalyzing(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: [
                { type: "image", source: { type: "base64", media_type: "image/jpeg", data: captured } },
                { type: "text", text: "Please translate any Japanese text in this image and explain the cultural context." },
              ],
            },
          ],
          mode: "deep",
          language,
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I couldn't analyze this image.";
      setMessages([...messages, { role: "assistant", content: `📷 Camera Translation:\n\n${reply}` }]);
      setScreen("chat");
    } catch {
      alert("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <div className="camera-screen">
      <h2 className="camera-title">📷 Camera Translate</h2>
      <p className="camera-desc">Point at Japanese text to translate & learn the cultural meaning</p>
      <video ref={videoRef} autoPlay playsInline className="camera-video" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {captured && <img src={`data:image/jpeg;base64,${captured}`} alt="captured" className="captured-img" />}
      <div className="camera-buttons">
        {!streaming && !captured && (
          <button className="cam-btn" onClick={startCamera}>📷 Start Camera</button>
        )}
        {streaming && (
          <button className="cam-btn" onClick={capture}>⬤ Capture</button>
        )}
        {captured && !analyzing && (
          <>
            <button className="cam-btn" onClick={analyze}>🔍 Analyze</button>
            <button className="cam-btn secondary" onClick={() => { setCaptured(null); startCamera(); }}>Retake</button>
          </>
        )}
        {analyzing && <div className="cam-btn">Kokoro is reading... 🌸</div>}
      </div>
      <button className="back-btn" onClick={() => setScreen("chat")}>← Back to Chat</button>
    </div>
  );
}
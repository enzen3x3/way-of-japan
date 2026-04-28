import { useState, useRef, useEffect } from "react";
import "./App.css";

const TRANSLATIONS = {
  en: {
    title: "Way of Japan",
    subtitle: "Your Cultural Guide 🌸",
    quick: "🌸 Quick",
    deep: "🍵 Deep",
    translate: "📷 Translate",
    placeholder: "Ask Kokoro anything about Japan...",
    send: "Send",
    thinking: "Kokoro is thinking... 🌸",
    freeLeft: (n, t) => `Free: ${n} / ${t} messages left today`,
    limitTitle: "Daily limit reached! 🌸",
    limitDesc: "You've used all 5 free messages for today.",
    weeklyPass: "Weekly Pass",
    weeklyPrice: "$3.99",
    weeklyDesc: "Unlimited for 7 days",
    monthly: "Monthly",
    monthlyPrice: "$4.99",
    monthlyDesc: "Unlimited + Deep mode",
    getWeekly: "Get Weekly Pass",
    getMonthly: "Get Monthly",
    maybeLater: "Maybe later",
    greeting: "Konnichiwa! 🌸 I'm Kokoro, your Japanese culture guide. Ask me anything about Japan — customs, food, travel tips, and more! How can I help you today?",
    scenes: [
      { emoji: "🍜", label: "Dining", query: "What are the dining etiquette rules in Japan?" },
      { emoji: "🚃", label: "Train", query: "What are the rules and etiquette on Japanese trains?" },
      { emoji: "♨️", label: "Onsen", query: "How do I use a Japanese onsen properly?" },
      { emoji: "🏯", label: "Sightseeing", query: "What should I know when visiting Japanese temples and shrines?" },
      { emoji: "💼", label: "Business", query: "What are the business etiquette rules in Japan?" },
    ],
    cameraTitle: "📷 Camera Translate",
    cameraDesc: "Point at Japanese text to translate & learn the cultural meaning",
    startCamera: "📷 Start Camera",
    capture: "⬤ Capture",
    analyze: "🔍 Analyze",
    retake: "Retake",
    analyzing: "Kokoro is reading... 🌸",
    back: "← Back to Chat",
    error: "Gomen nasai! Something went wrong. Please try again 🙏",
    sorry: "Sorry, I couldn't understand that. Please try again!",
  },
  zh: {
    title: "日本之道",
    subtitle: "您的文化向导 🌸",
    quick: "🌸 快速",
    deep: "🍵 深度",
    translate: "📷 翻译",
    placeholder: "向Kokoro询问任何关于日本的问题...",
    send: "发送",
    thinking: "Kokoro正在思考... 🌸",
    freeLeft: (n, t) => `免费：今天还剩 ${n} / ${t} 条消息`,
    limitTitle: "已达到每日限制！🌸",
    limitDesc: "您今天的5条免费消息已用完。",
    weeklyPass: "周卡",
    weeklyPrice: "$3.99",
    weeklyDesc: "7天无限使用",
    monthly: "月卡",
    monthlyPrice: "$4.99",
    monthlyDesc: "无限使用 + 深度模式",
    getWeekly: "获取周卡",
    getMonthly: "获取月卡",
    maybeLater: "稍后再说",
    greeting: "你好！🌸 我是Kokoro，您的日本文化向导。随时向我询问关于日本的任何问题——风俗、美食、旅行tips等等！今天我能帮您什么？",
    scenes: [
      { emoji: "🍜", label: "用餐", query: "日本的用餐礼仪是什么？" },
      { emoji: "🚃", label: "电车", query: "在日本乘坐电车有哪些规则和礼仪？" },
      { emoji: "♨️", label: "温泉", query: "如何正确使用日本温泉？" },
      { emoji: "🏯", label: "观光", query: "参观日本寺庙和神社时需要注意什么？" },
      { emoji: "💼", label: "商务", query: "日本的商务礼仪是什么？" },
    ],
    cameraTitle: "📷 相机翻译",
    cameraDesc: "对准日文文字进行翻译并了解文化含义",
    startCamera: "📷 启动相机",
    capture: "⬤ 拍照",
    analyze: "🔍 分析",
    retake: "重拍",
    analyzing: "Kokoro正在阅读... 🌸",
    back: "← 返回聊天",
    error: "对不起！出了点问题，请再试一次 🙏",
    sorry: "抱歉，我没能理解。请再试一次！",
  },
  ko: {
    title: "일본의 길",
    subtitle: "당신의 문화 가이드 🌸",
    quick: "🌸 빠른",
    deep: "🍵 깊은",
    translate: "📷 번역",
    placeholder: "일본에 대해 Kokoro에게 무엇이든 물어보세요...",
    send: "전송",
    thinking: "Kokoro가 생각 중... 🌸",
    freeLeft: (n, t) => `무료: 오늘 ${n} / ${t} 메시지 남음`,
    limitTitle: "일일 한도 도달! 🌸",
    limitDesc: "오늘의 무료 메시지 5개를 모두 사용했습니다.",
    weeklyPass: "주간 패스",
    weeklyPrice: "$3.99",
    weeklyDesc: "7일 무제한",
    monthly: "월간",
    monthlyPrice: "$4.99",
    monthlyDesc: "무제한 + 깊은 모드",
    getWeekly: "주간 패스 구매",
    getMonthly: "월간 구매",
    maybeLater: "나중에",
    greeting: "안녕하세요! 🌸 저는 Kokoro, 일본 문화 가이드입니다. 일본에 대한 무엇이든 물어보세요 — 관습, 음식, 여행 팁 등! 오늘 무엇을 도와드릴까요?",
    scenes: [
      { emoji: "🍜", label: "식사", query: "일본의 식사 예절은 무엇인가요?" },
      { emoji: "🚃", label: "전철", query: "일본 전철에서의 규칙과 예절은 무엇인가요?" },
      { emoji: "♨️", label: "온천", query: "일본 온천을 올바르게 이용하는 방법은?" },
      { emoji: "🏯", label: "관광", query: "일본 사찰과 신사를 방문할 때 알아야 할 것은?" },
      { emoji: "💼", label: "비즈니스", query: "일본의 비즈니스 예절은 무엇인가요?" },
    ],
    cameraTitle: "📷 카메라 번역",
    cameraDesc: "일본어 텍스트를 가리켜 번역하고 문화적 의미를 알아보세요",
    startCamera: "📷 카메라 시작",
    capture: "⬤ 촬영",
    analyze: "🔍 분석",
    retake: "다시 찍기",
    analyzing: "Kokoro가 읽는 중... 🌸",
    back: "← 채팅으로 돌아가기",
    error: "죄송합니다! 문제가 발생했습니다. 다시 시도해주세요 🙏",
    sorry: "죄송합니다, 이해하지 못했습니다. 다시 시도해주세요!",
  },
};

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
  const [language, setLanguage] = useState("en");
  const t = TRANSLATIONS[language];

  const [messages, setMessages] = useState([
    { role: "assistant", content: t.greeting },
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("quick");
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

  // 言語変更時に挨拶を更新
  useEffect(() => {
    setMessages([{ role: "assistant", content: TRANSLATIONS[language].greeting }]);
  }, [language]);

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
      const reply = data.content?.[0]?.text || t.sorry;
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: t.error }]);
    } finally {
      setLoading(false);
    }
  }

  async function sendScene(query) {
    const newMessages = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, mode, language }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || t.sorry;
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: t.error }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1 className="header-title">{t.title}</h1>
          <p className="header-subtitle">{t.subtitle}</p>
        </div>
        <select className="lang-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">🇺🇸 EN</option>
          <option value="zh">🇨🇳 ZH</option>
          <option value="ko">🇰🇷 KO</option>
        </select>
      </header>

      <div className="mode-toggle">
        <button className={`mode-btn ${mode === "quick" ? "active" : ""}`} onClick={() => setMode("quick")}>{t.quick}</button>
        <button className={`mode-btn ${mode === "deep" ? "active" : ""}`} onClick={() => setMode("deep")}>{t.deep}</button>
        <button className={`mode-btn ${screen === "camera" ? "active" : ""}`} onClick={() => setScreen(screen === "camera" ? "chat" : "camera")}>{t.translate}</button>
      </div>

      {screen === "chat" ? (
        <>
          <div className="scene-buttons">
            {t.scenes.map((s) => (
              <button key={s.label} className="scene-btn" onClick={() => sendScene(s.query)}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>

          <div className="chat-wrapper">
            <div className="chat-area">
              {messages.map((msg, i) => (
                <div key={i} className={`message-row ${msg.role}`}>
                  <div className={`bubble ${msg.role}`}>{msg.content}</div>
                </div>
              ))}
              {loading && (
                <div className="message-row assistant">
                  <div className="bubble assistant typing">{t.thinking}</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="kokoro-fixed">
              <button className="kokoro-toggle" onClick={() => setUseReal(!useReal)}>
                🔄
              </button>
              <img src={kokoroImg} alt="Kokoro" className="kokoro-img" />
            </div>
          </div>

          {mode === "quick" && (
            <div className="usage-bar">{t.freeLeft(DAILY_LIMIT - dailyCount, DAILY_LIMIT)}</div>
          )}

          <div className="input-area">
            <input
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={t.placeholder}
            />
            <button className="send-btn" onClick={() => sendMessage()}>{t.send}</button>
          </div>
        </>
      ) : (
        <CameraScreen language={language} t={t} setScreen={setScreen} setMessages={setMessages} messages={messages} />
      )}

      {showPaywall && (
        <div className="modal-overlay" onClick={() => setShowPaywall(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src="/images/kokoro-chibi.png" alt="Kokoro" className="modal-chibi" />
            <h2>{t.limitTitle}</h2>
            <p>{t.limitDesc}</p>
            <div className="modal-plans">
              <div className="plan">
                <div className="plan-name">{t.weeklyPass}</div>
                <div className="plan-price">{t.weeklyPrice}</div>
                <div className="plan-desc">{t.weeklyDesc}</div>
                <button className="plan-btn">{t.getWeekly}</button>
              </div>
              <div className="plan featured">
                <div className="plan-name">{t.monthly}</div>
                <div className="plan-price">{t.monthlyPrice}</div>
                <div className="plan-desc">{t.monthlyDesc}</div>
                <button className="plan-btn">{t.getMonthly}</button>
              </div>
            </div>
            <button className="modal-close" onClick={() => setShowPaywall(false)}>{t.maybeLater}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CameraScreen({ language, t, setScreen, setMessages, messages }) {
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
      setMessages([...messages, { role: "assistant", content: `📷 ${t.cameraTitle}:\n\n${reply}` }]);
      setScreen("chat");
    } catch {
      alert("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <div className="camera-screen">
      <h2 className="camera-title">{t.cameraTitle}</h2>
      <p className="camera-desc">{t.cameraDesc}</p>
      <video ref={videoRef} autoPlay playsInline className="camera-video" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {captured && <img src={`data:image/jpeg;base64,${captured}`} alt="captured" className="captured-img" />}
      <div className="camera-buttons">
        {!streaming && !captured && <button className="cam-btn" onClick={startCamera}>{t.startCamera}</button>}
        {streaming && <button className="cam-btn" onClick={capture}>{t.capture}</button>}
        {captured && !analyzing && (
          <>
            <button className="cam-btn" onClick={analyze}>{t.analyze}</button>
            <button className="cam-btn secondary" onClick={() => { setCaptured(null); startCamera(); }}>{t.retake}</button>
          </>
        )}
        {analyzing && <div className="cam-btn">{t.analyzing}</div>}
      </div>
      <button className="back-btn" onClick={() => setScreen("chat")}>{t.back}</button>
    </div>
  );
}
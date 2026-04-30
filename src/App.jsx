import { useState, useRef, useEffect } from "react";
import "./App.css";

const SCENE_DATA = {
  en: [
    {
      emoji: "🍜", label: "Dining",
      sub: [
        { emoji: "🍣", label: "Sushi", query: "What are the etiquette rules for eating sushi in Japan?" },
        { emoji: "🍜", label: "Ramen", query: "How do I eat ramen properly in Japan?" },
        { emoji: "🥩", label: "Yakiniku", query: "How do I eat yakiniku (Japanese BBQ) properly?" },
        { emoji: "🍤", label: "Tempura", query: "How do I eat tempura properly in Japan?" },
        { emoji: "🐟", label: "Unagi", query: "How do I eat unagi (eel) properly in Japan?" },
        { emoji: "🍱", label: "Sukiyaki", query: "How do I eat sukiyaki properly in Japan?" },
        { emoji: "🍶", label: "Izakaya", query: "What are the rules and etiquette at a Japanese izakaya?" },
      ]
    },
    {
      emoji: "🚃", label: "Train",
      sub: [
        { emoji: "🎫", label: "Tickets", query: "How do I buy train tickets in Japan?" },
        { emoji: "🚃", label: "Manners", query: "What are the manners on Japanese trains?" },
        { emoji: "🗺️", label: "Routes", query: "How do I read a Japanese train route map?" },
      ]
    },
    {
      emoji: "♨️", label: "Onsen",
      sub: [
        { emoji: "🛁", label: "How to use", query: "How do I use a Japanese onsen properly?" },
        { emoji: "🔱", label: "Tattoo", query: "What are the rules about tattoos at Japanese onsens?" },
        { emoji: "👫", label: "Mixed bath", query: "What should I know about mixed bathing onsens in Japan?" },
        { emoji: "🏨", label: "Ryokan", query: "What are the etiquette rules at a Japanese ryokan?" },
      ]
    },
    {
      emoji: "🏯", label: "Sightseeing",
      sub: [
        { emoji: "⛩️", label: "Shrine", query: "How do I visit a Japanese shrine properly?" },
        { emoji: "🛕", label: "Temple", query: "How do I visit a Japanese temple properly?" },
        { emoji: "🏯", label: "Castle", query: "What should I know when visiting Japanese castles?" },
        { emoji: "🌿", label: "Garden", query: "What are the etiquette rules at Japanese gardens?" },
      ]
    },
    {
      emoji: "🛍️", label: "Shopping",
      sub: [
        { emoji: "🧾", label: "Tax-free", query: "How does tax-free shopping work in Japan for tourists?" },
        { emoji: "💴", label: "100¥ Shop", query: "What should I know about 100 yen shops in Japan?" },
        { emoji: "🏪", label: "Convenience", query: "How do I use a Japanese convenience store?" },
        { emoji: "🏬", label: "Department", query: "What are the etiquette rules at Japanese department stores?" },
      ]
    },
    {
      emoji: "🎭", label: "Tradition",
      sub: [
        { emoji: "🍵", label: "Tea Ceremony", query: "How do I participate in a Japanese tea ceremony?" },
        { emoji: "👘", label: "Kimono", query: "How do I wear and behave in a kimono in Japan?" },
        { emoji: "🧘", label: "Zazen", query: "What should I know about zazen meditation in Japan?" },
        { emoji: "✍️", label: "Calligraphy", query: "What should I know about Japanese calligraphy experience?" },
      ]
    },
    {
      emoji: "🏥", label: "Emergency",
      sub: [
        { emoji: "🏥", label: "Hospital", query: "How do I use a hospital in Japan as a foreigner?" },
        { emoji: "👮", label: "Police", query: "How do I contact the police in Japan as a foreigner?" },
        { emoji: "👜", label: "Lost items", query: "What should I do if I lose something in Japan?" },
        { emoji: "🚨", label: "Disaster", query: "What should I do in case of an earthquake or disaster in Japan?" },
      ]
    },
  ],
  zh: [
    {
      emoji: "🍜", label: "用餐",
      sub: [
        { emoji: "🍣", label: "寿司", query: "在日本吃寿司有哪些礼仪？" },
        { emoji: "🍜", label: "拉面", query: "在日本如何正确吃拉面？" },
        { emoji: "🥩", label: "烧肉", query: "如何正确享用日式烧肉？" },
        { emoji: "🍤", label: "天妇罗", query: "在日本如何正确吃天妇罗？" },
        { emoji: "🐟", label: "鳗鱼", query: "在日本如何正确吃鳗鱼饭？" },
        { emoji: "🍱", label: "寿喜锅", query: "如何正确享用日式寿喜锅？" },
        { emoji: "🍶", label: "居酒屋", query: "在日本居酒屋有哪些规则和礼仪？" },
      ]
    },
    {
      emoji: "🚃", label: "电车",
      sub: [
        { emoji: "🎫", label: "买票", query: "如何在日本购买电车票？" },
        { emoji: "🚃", label: "礼仪", query: "日本电车上有哪些礼仪？" },
        { emoji: "🗺️", label: "路线图", query: "如何看懂日本电车路线图？" },
      ]
    },
    {
      emoji: "♨️", label: "温泉",
      sub: [
        { emoji: "🛁", label: "使用方法", query: "如何正确使用日本温泉？" },
        { emoji: "🔱", label: "纹身", query: "有纹身能进日本温泉吗？" },
        { emoji: "👫", label: "混浴", query: "关于日本混浴温泉需要了解什么？" },
        { emoji: "🏨", label: "旅馆", query: "在日本旅馆住宿有哪些礼仪？" },
      ]
    },
    {
      emoji: "🏯", label: "观光",
      sub: [
        { emoji: "⛩️", label: "神社", query: "如何正确参拜日本神社？" },
        { emoji: "🛕", label: "寺庙", query: "如何正确参观日本寺庙？" },
        { emoji: "🏯", label: "城堡", query: "参观日本城堡需要注意什么？" },
        { emoji: "🌿", label: "庭园", query: "在日本庭园有哪些礼仪？" },
      ]
    },
    {
      emoji: "🛍️", label: "购物",
      sub: [
        { emoji: "🧾", label: "免税", query: "外国游客如何在日本享受免税购物？" },
        { emoji: "💴", label: "百元店", query: "关于日本百元店需要了解什么？" },
        { emoji: "🏪", label: "便利店", query: "如何使用日本便利店？" },
        { emoji: "🏬", label: "百货店", query: "在日本百货店有哪些礼仪？" },
      ]
    },
    {
      emoji: "🎭", label: "传统体验",
      sub: [
        { emoji: "🍵", label: "茶道", query: "如何参加日本茶道体验？" },
        { emoji: "👘", label: "和服", query: "穿和服时有哪些注意事项？" },
        { emoji: "🧘", label: "坐禅", query: "关于日本坐禅冥想需要了解什么？" },
        { emoji: "✍️", label: "书道", query: "关于日本书法体验需要了解什么？" },
      ]
    },
    {
      emoji: "🏥", label: "紧急情况",
      sub: [
        { emoji: "🏥", label: "医院", query: "外国人如何在日本使用医院？" },
        { emoji: "👮", label: "警察", query: "在日本如何联系警察？" },
        { emoji: "👜", label: "失物", query: "在日本丢失物品怎么办？" },
        { emoji: "🚨", label: "灾害", query: "在日本遇到地震或灾害时该怎么办？" },
      ]
    },
  ],
  ko: [
    {
      emoji: "🍜", label: "식사",
      sub: [
        { emoji: "🍣", label: "스시", query: "일본에서 스시를 먹을 때 예절은?" },
        { emoji: "🍜", label: "라멘", query: "일본에서 라멘을 올바르게 먹는 방법은?" },
        { emoji: "🥩", label: "야키니쿠", query: "일본식 야키니쿠를 올바르게 즐기는 방법은?" },
        { emoji: "🍤", label: "텐푸라", query: "일본에서 텐푸라를 올바르게 먹는 방법은?" },
        { emoji: "🐟", label: "장어", query: "일본에서 장어덮밥을 올바르게 먹는 방법은?" },
        { emoji: "🍱", label: "스키야키", query: "스키야키를 올바르게 즐기는 방법은?" },
        { emoji: "🍶", label: "이자카야", query: "일본 이자카야에서의 규칙과 예절은?" },
      ]
    },
    {
      emoji: "🚃", label: "전철",
      sub: [
        { emoji: "🎫", label: "티켓", query: "일본에서 전철 티켓 사는 방법은?" },
        { emoji: "🚃", label: "매너", query: "일본 전철에서의 매너는?" },
        { emoji: "🗺️", label: "노선도", query: "일본 전철 노선도 읽는 방법은?" },
      ]
    },
    {
      emoji: "♨️", label: "온천",
      sub: [
        { emoji: "🛁", label: "이용방법", query: "일본 온천을 올바르게 이용하는 방법은?" },
        { emoji: "🔱", label: "타투", query: "타투가 있으면 일본 온천에 들어갈 수 있나요?" },
        { emoji: "👫", label: "혼욕", query: "일본 혼욕 온천에 대해 알아야 할 것은?" },
        { emoji: "🏨", label: "료칸", query: "일본 료칸에서의 예절은?" },
      ]
    },
    {
      emoji: "🏯", label: "관광",
      sub: [
        { emoji: "⛩️", label: "신사", query: "일본 신사를 올바르게 참배하는 방법은?" },
        { emoji: "🛕", label: "절", query: "일본 사찰을 올바르게 방문하는 방법은?" },
        { emoji: "🏯", label: "성", query: "일본 성을 방문할 때 알아야 할 것은?" },
        { emoji: "🌿", label: "정원", query: "일본 정원에서의 예절은?" },
      ]
    },
    {
      emoji: "🛍️", label: "쇼핑",
      sub: [
        { emoji: "🧾", label: "면세", query: "일본에서 외국인 면세 쇼핑하는 방법은?" },
        { emoji: "💴", label: "100엔샵", query: "일본 100엔샵에 대해 알아야 할 것은?" },
        { emoji: "🏪", label: "편의점", query: "일본 편의점 이용 방법은?" },
        { emoji: "🏬", label: "백화점", query: "일본 백화점에서의 예절은?" },
      ]
    },
    {
      emoji: "🎭", label: "전통체험",
      sub: [
        { emoji: "🍵", label: "다도", query: "일본 다도 체험에 참가하는 방법은?" },
        { emoji: "👘", label: "기모노", query: "기모노를 입을 때 주의사항은?" },
        { emoji: "🧘", label: "좌선", query: "일본 좌선 명상에 대해 알아야 할 것은?" },
        { emoji: "✍️", label: "서도", query: "일본 서예 체험에 대해 알아야 할 것은?" },
      ]
    },
    {
      emoji: "🏥", label: "긴급상황",
      sub: [
        { emoji: "🏥", label: "병원", query: "외국인이 일본에서 병원을 이용하는 방법은?" },
        { emoji: "👮", label: "경찰", query: "일본에서 경찰에 연락하는 방법은?" },
        { emoji: "👜", label: "분실물", query: "일본에서 물건을 잃어버렸을 때는?" },
        { emoji: "🚨", label: "재해", query: "일본에서 지진이나 재해가 발생했을 때는?" },
      ]
    },
  ],
};

const OTHER_SCENES = {
  en: [
    { emoji: "🚕", label: "Taxi", query: "How do I use a taxi in Japan?" },
    { emoji: "🏧", label: "Money", query: "How do I handle money and ATMs in Japan?" },
    { emoji: "🚽", label: "Toilet", query: "How do I use a Japanese toilet?" },
    { emoji: "📶", label: "Internet", query: "How do I get internet access in Japan?" },
    { emoji: "🏠", label: "Stay", query: "What are the etiquette rules for staying in Japan?" },
    { emoji: "🗣️", label: "Language", query: "What basic Japanese phrases should I know?" },
    { emoji: "🎌", label: "Festivals", query: "What should I know about Japanese festivals?" },
    { emoji: "🌸", label: "Seasons", query: "What are the best seasons to visit Japan?" },
    { emoji: "🗾", label: "Regions", query: "What are the must-visit regions in Japan?" },
  ],
  zh: [
    { emoji: "🚕", label: "出租车", query: "如何在日本使用出租车？" },
    { emoji: "🏧", label: "金钱", query: "如何在日本使用ATM和处理金钱？" },
    { emoji: "🚽", label: "厕所", query: "如何使用日本的厕所？" },
    { emoji: "📶", label: "网络", query: "如何在日本获得网络连接？" },
    { emoji: "🏠", label: "住宿", query: "在日本住宿有哪些礼仪？" },
    { emoji: "🗣️", label: "语言", query: "在日本需要知道哪些基本日语？" },
    { emoji: "🎌", label: "祭典", query: "关于日本祭典需要了解什么？" },
    { emoji: "🌸", label: "季节", query: "什么季节去日本最好？" },
    { emoji: "🗾", label: "地方", query: "日本有哪些必去的地区？" },
  ],
  ko: [
    { emoji: "🚕", label: "택시", query: "일본에서 택시 이용 방법은?" },
    { emoji: "🏧", label: "돈", query: "일본에서 ATM과 돈을 어떻게 사용하나요?" },
    { emoji: "🚽", label: "화장실", query: "일본 화장실 사용 방법은?" },
    { emoji: "📶", label: "인터넷", query: "일본에서 인터넷을 사용하는 방법은?" },
    { emoji: "🏠", label: "숙박", query: "일본 숙박 예절은?" },
    { emoji: "🗣️", label: "언어", query: "일본에서 알아야 할 기본 일본어는?" },
    { emoji: "🎌", label: "축제", query: "일본 축제에 대해 알아야 할 것은?" },
    { emoji: "🌸", label: "계절", query: "일본을 방문하기 가장 좋은 계절은?" },
    { emoji: "🗾", label: "지역", query: "일본에서 꼭 가야 할 지역은?" },
  ],
};

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
    other: "More",
    back: "← Back",
    cameraTitle: "📷 Camera Translate",
    cameraDesc: "Point at Japanese text to translate & learn the cultural meaning",
    startCamera: "📷 Start Camera",
    capture: "⬤ Capture",
    analyze: "🔍 Analyze",
    retake: "Retake",
    analyzing: "Kokoro is reading... 🌸",
    backToChat: "← Back to Chat",
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
    greeting: "你好！🌸 我是Kokoro，您的日本文化向导。随时向我询问关于日本的任何问题！",
    other: "更多",
    back: "← 返回",
    cameraTitle: "📷 相机翻译",
    cameraDesc: "对准日文文字进行翻译并了解文化含义",
    startCamera: "📷 启动相机",
    capture: "⬤ 拍照",
    analyze: "🔍 分析",
    retake: "重拍",
    analyzing: "Kokoro正在阅读... 🌸",
    backToChat: "← 返回聊天",
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
    greeting: "안녕하세요! 🌸 저는 Kokoro, 일본 문화 가이드입니다. 무엇이든 물어보세요!",
    other: "더보기",
    back: "← 뒤로",
    cameraTitle: "📷 카메라 번역",
    cameraDesc: "일본어 텍스트를 가리켜 번역하고 문화적 의미를 알아보세요",
    startCamera: "📷 카메라 시작",
    capture: "⬤ 촬영",
    analyze: "🔍 분석",
    retake: "다시 찍기",
    analyzing: "Kokoro가 읽는 중... 🌸",
    backToChat: "← 채팅으로 돌아가기",
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
  const scenes = SCENE_DATA[language];
  const otherScenes = OTHER_SCENES[language];

  const [messages, setMessages] = useState([{ role: "assistant", content: t.greeting }]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("quick");
  const [loading, setLoading] = useState(false);
  const [dailyCount, setDailyCount] = useState(getDailyCount());
  const [showPaywall, setShowPaywall] = useState(false);
  const [screen, setScreen] = useState("chat");
  const [useReal, setUseReal] = useState(false);
  const [openScene, setOpenScene] = useState(null); // 開いているシーンのindex
  const [showOther, setShowOther] = useState(false);
  const bottomRef = useRef(null);

  const kokoroImg = useReal ? "/images/kokoro-real.png" : "/images/kokoro-chibi.png";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([{ role: "assistant", content: TRANSLATIONS[language].greeting }]);
  }, [language]);

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText) return;
    if (mode === "quick" && dailyCount >= DAILY_LIMIT) { setShowPaywall(true); return; }
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
    setOpenScene(null);
    setShowOther(false);
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
          <div className="main-layout">
            {/* 左カラム */}
            <div className="left-col">
              <div className="scene-buttons-vertical">
                {scenes.map((s, i) => (
                  <button
                    key={s.label}
                    className={`scene-btn-vertical ${openScene === i ? "active" : ""}`}
                    onClick={() => { setOpenScene(openScene === i ? null : i); setShowOther(false); }}
                  >
                    <span className="scene-btn-emoji">{s.emoji}</span>
                    <span>{s.label}</span>
                  </button>
                ))}
                {/* その他ボタン */}
                <button
                  className={`scene-btn-vertical ${showOther ? "active" : ""}`}
                  onClick={() => { setShowOther(!showOther); setOpenScene(null); }}
                >
                  <span className="scene-btn-emoji">➕</span>
                  <span>{t.other}</span>
                </button>
              </div>

              <div className="kokoro-left">
                <button className="kokoro-toggle" onClick={() => setUseReal(!useReal)}>🔄</button>
                <img src={kokoroImg} alt="Kokoro" className="kokoro-img" />
              </div>
            </div>

            {/* 右カラム */}
            <div className="right-col">
              {/* アコーディオン展開 */}
              {openScene !== null && (
                <div className="accordion">
                  <p className="accordion-title">{scenes[openScene].emoji} {scenes[openScene].label}</p>
                  <div className="accordion-grid">
                    {scenes[openScene].sub.map((sub) => (
                      <button key={sub.label} className="accordion-btn" onClick={() => sendScene(sub.query)}>
                        <span>{sub.emoji}</span>
                        <span>{sub.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* その他展開 */}
              {showOther && (
                <div className="accordion">
                  <p className="accordion-title">➕ {t.other}</p>
                  <div className="accordion-grid">
                    {otherScenes.map((s) => (
                      <button key={s.label} className="accordion-btn" onClick={() => sendScene(s.query)}>
                        <span>{s.emoji}</span>
                        <span>{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* チャット */}
              <div className="chat-area">
                {messages.map((msg, i) => (
                  <div key={i} className={`message-row ${msg.role}`}>
                    <div className={`bubble ${msg.role}`}>
                      {msg.content.split('\n').map((line, j) => {
                        if (line === '') return <div key={j} style={{ height: '8px' }} />;
                        const isBold = line.startsWith('## ') || line.startsWith('**');
                        const cleaned = line.replace(/^##\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1');
                        const isBullet = line.startsWith('- ');
                        const bulletText = isBullet ? cleaned.replace(/^-\s*/, '') : cleaned;
                        if (isBullet) return <p key={j} style={{ margin: '2px 0', paddingLeft: '12px', borderLeft: '2px solid #e8a4b8' }}>{bulletText}</p>;
                        if (isBold) return <p key={j} style={{ margin: '6px 0 2px', fontWeight: '700', color: '#c4758f' }}>{cleaned}</p>;
                        return <p key={j} style={{ margin: '2px 0' }}>{cleaned}</p>;
                      })}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="message-row assistant">
                    <div className="bubble assistant typing">{t.thinking}</div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
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
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: "image/jpeg", data: captured } },
              { type: "text", text: "Please translate any Japanese text in this image and explain the cultural context." },
            ],
          }],
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
      <button className="back-btn" onClick={() => setScreen("chat")}>{t.backToChat}</button>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import "./App.css";

const SCENE_DATA = {
  "zh-tw": [], th: [], fr: [],
  en: [
    { emoji: "🍜", label: "Dining", sub: [
      { emoji: "🍣", label: "Sushi", query: "What are the etiquette rules for eating sushi in Japan?" },
      { emoji: "🍜", label: "Ramen", query: "How do I eat ramen properly in Japan?" },
      { emoji: "🥩", label: "Yakiniku", query: "How do I eat yakiniku (Japanese BBQ) properly?" },
      { emoji: "🍤", label: "Tempura", query: "How do I eat tempura properly in Japan?" },
      { emoji: "🐟", label: "Unagi", query: "How do I eat unagi (eel) properly in Japan?" },
      { emoji: "🍱", label: "Sukiyaki", query: "How do I eat sukiyaki properly in Japan?" },
      { emoji: "🍶", label: "Izakaya", query: "What are the rules and etiquette at a Japanese izakaya?" },
    ]},
    { emoji: "🚃", label: "Train", sub: [
      { emoji: "🎫", label: "Tickets", query: "How do I buy train tickets in Japan?" },
      { emoji: "🚃", label: "Manners", query: "What are the manners on Japanese trains?" },
      { emoji: "🗺️", label: "Routes", query: "How do I read a Japanese train route map?" },
    ]},
    { emoji: "♨️", label: "Onsen", sub: [
      { emoji: "🛁", label: "How to use", query: "How do I use a Japanese onsen properly?" },
      { emoji: "🔱", label: "Tattoo", query: "What are the rules about tattoos at Japanese onsens?" },
      { emoji: "👫", label: "Mixed bath", query: "What should I know about mixed bathing onsens in Japan?" },
      { emoji: "🏨", label: "Ryokan", query: "What are the etiquette rules at a Japanese ryokan?" },
    ]},
    { emoji: "🏯", label: "Sightseeing", sub: [
      { emoji: "⛩️", label: "Shrine", query: "How do I visit a Japanese shrine properly?" },
      { emoji: "🛕", label: "Temple", query: "How do I visit a Japanese temple properly?" },
      { emoji: "🏯", label: "Castle", query: "What should I know when visiting Japanese castles?" },
      { emoji: "🌿", label: "Garden", query: "What are the etiquette rules at Japanese gardens?" },
    ]},
    { emoji: "🛍️", label: "Shopping", sub: [
      { emoji: "🧾", label: "Tax-free", query: "How does tax-free shopping work in Japan for tourists?" },
      { emoji: "💴", label: "100¥ Shop", query: "What should I know about 100 yen shops in Japan?" },
      { emoji: "🏪", label: "Convenience", query: "How do I use a Japanese convenience store?" },
      { emoji: "🏬", label: "Department", query: "What are the etiquette rules at Japanese department stores?" },
    ]},
    { emoji: "🎭", label: "Tradition", sub: [
      { emoji: "🍵", label: "Tea Ceremony", query: "How do I participate in a Japanese tea ceremony?" },
      { emoji: "👘", label: "Kimono", query: "How do I wear and behave in a kimono in Japan?" },
      { emoji: "🧘", label: "Zazen", query: "What should I know about zazen meditation in Japan?" },
      { emoji: "✍️", label: "Calligraphy", query: "What should I know about Japanese calligraphy experience?" },
    ]},
    { emoji: "🏥", label: "Emergency", sub: [
      { emoji: "🏥", label: "Hospital", query: "How do I use a hospital in Japan as a foreigner?" },
      { emoji: "👮", label: "Police", query: "How do I contact the police in Japan as a foreigner?" },
      { emoji: "👜", label: "Lost items", query: "What should I do if I lose something in Japan?" },
      { emoji: "🚨", label: "Disaster", query: "What should I do in case of an earthquake or disaster in Japan?" },
    ]},
  ],
  zh: [
    { emoji: "🍜", label: "用餐", sub: [
      { emoji: "🍣", label: "寿司", query: "在日本吃寿司有哪些礼仪？" },
      { emoji: "🍜", label: "拉面", query: "在日本如何正确吃拉面？" },
      { emoji: "🥩", label: "烧肉", query: "如何正确享用日式烧肉？" },
      { emoji: "🍤", label: "天妇罗", query: "在日本如何正确吃天妇罗？" },
      { emoji: "🐟", label: "鳗鱼", query: "在日本如何正确吃鳗鱼饭？" },
      { emoji: "🍱", label: "寿喜锅", query: "如何正确享用日式寿喜锅？" },
      { emoji: "🍶", label: "居酒屋", query: "在日本居酒屋有哪些规则和礼仪？" },
    ]},
    { emoji: "🚃", label: "电车", sub: [
      { emoji: "🎫", label: "买票", query: "如何在日本购买电车票？" },
      { emoji: "🚃", label: "礼仪", query: "日本电车上有哪些礼仪？" },
      { emoji: "🗺️", label: "路线图", query: "如何看懂日本电车路线图？" },
    ]},
    { emoji: "♨️", label: "温泉", sub: [
      { emoji: "🛁", label: "使用方法", query: "如何正确使用日本温泉？" },
      { emoji: "🔱", label: "纹身", query: "有纹身能进日本温泉吗？" },
      { emoji: "👫", label: "混浴", query: "关于日本混浴温泉需要了解什么？" },
      { emoji: "🏨", label: "旅馆", query: "在日本旅馆住宿有哪些礼仪？" },
    ]},
    { emoji: "🏯", label: "观光", sub: [
      { emoji: "⛩️", label: "神社", query: "如何正确参拜日本神社？" },
      { emoji: "🛕", label: "寺庙", query: "如何正确参观日本寺庙？" },
      { emoji: "🏯", label: "城堡", query: "参观日本城堡需要注意什么？" },
      { emoji: "🌿", label: "庭园", query: "在日本庭园有哪些礼仪？" },
    ]},
    { emoji: "🛍️", label: "购物", sub: [
      { emoji: "🧾", label: "免税", query: "外国游客如何在日本享受免税购物？" },
      { emoji: "💴", label: "百元店", query: "关于日本百元店需要了解什么？" },
      { emoji: "🏪", label: "便利店", query: "如何使用日本便利店？" },
      { emoji: "🏬", label: "百货店", query: "在日本百货店有哪些礼仪？" },
    ]},
    { emoji: "🎭", label: "传统体验", sub: [
      { emoji: "🍵", label: "茶道", query: "如何参加日本茶道体验？" },
      { emoji: "👘", label: "和服", query: "穿和服时有哪些注意事项？" },
      { emoji: "🧘", label: "坐禅", query: "关于日本坐禅冥想需要了解什么？" },
      { emoji: "✍️", label: "书道", query: "关于日本书法体验需要了解什么？" },
    ]},
    { emoji: "🏥", label: "紧急情况", sub: [
      { emoji: "🏥", label: "医院", query: "外国人如何在日本使用医院？" },
      { emoji: "👮", label: "警察", query: "在日本如何联系警察？" },
      { emoji: "👜", label: "失物", query: "在日本丢失物品怎么办？" },
      { emoji: "🚨", label: "灾害", query: "在日本遇到地震或灾害时该怎么办？" },
    ]},
  ],
  ko: [
    { emoji: "🍜", label: "식사", sub: [
      { emoji: "🍣", label: "스시", query: "일본에서 스시를 먹을 때 예절은?" },
      { emoji: "🍜", label: "라멘", query: "일본에서 라멘을 올바르게 먹는 방법은?" },
      { emoji: "🥩", label: "야키니쿠", query: "일본식 야키니쿠를 올바르게 즐기는 방법은?" },
      { emoji: "🍤", label: "텐푸라", query: "일본에서 텐푸라를 올바르게 먹는 방법은?" },
      { emoji: "🐟", label: "장어", query: "일본에서 장어덮밥을 올바르게 먹는 방법은?" },
      { emoji: "🍱", label: "스키야키", query: "스키야키를 올바르게 즐기는 방법은?" },
      { emoji: "🍶", label: "이자카야", query: "일본 이자카야에서의 규칙과 예절은?" },
    ]},
    { emoji: "🚃", label: "전철", sub: [
      { emoji: "🎫", label: "티켓", query: "일본에서 전철 티켓 사는 방법은?" },
      { emoji: "🚃", label: "매너", query: "일본 전철에서의 매너는?" },
      { emoji: "🗺️", label: "노선도", query: "일본 전철 노선도 읽는 방법은?" },
    ]},
    { emoji: "♨️", label: "온천", sub: [
      { emoji: "🛁", label: "이용방법", query: "일본 온천을 올바르게 이용하는 방법은?" },
      { emoji: "🔱", label: "타투", query: "타투가 있으면 일본 온천에 들어갈 수 있나요?" },
      { emoji: "👫", label: "혼욕", query: "일본 혼욕 온천에 대해 알아야 할 것은?" },
      { emoji: "🏨", label: "료칸", query: "일본 료칸에서의 예절은?" },
    ]},
    { emoji: "🏯", label: "관광", sub: [
      { emoji: "⛩️", label: "신사", query: "일본 신사를 올바르게 참배하는 방법은?" },
      { emoji: "🛕", label: "절", query: "일본 사찰을 올바르게 방문하는 방법은?" },
      { emoji: "🏯", label: "성", query: "일본 성을 방문할 때 알아야 할 것은?" },
      { emoji: "🌿", label: "정원", query: "일본 정원에서의 예절은?" },
    ]},
    { emoji: "🛍️", label: "쇼핑", sub: [
      { emoji: "🧾", label: "면세", query: "일본에서 외국인 면세 쇼핑하는 방법은?" },
      { emoji: "💴", label: "100엔샵", query: "일본 100엔샵에 대해 알아야 할 것은?" },
      { emoji: "🏪", label: "편의점", query: "일본 편의점 이용 방법은?" },
      { emoji: "🏬", label: "백화점", query: "일본 백화점에서의 예절은?" },
    ]},
    { emoji: "🎭", label: "전통체험", sub: [
      { emoji: "🍵", label: "다도", query: "일본 다도 체험에 참가하는 방법은?" },
      { emoji: "👘", label: "기모노", query: "기모노를 입을 때 주의사항은?" },
      { emoji: "🧘", label: "좌선", query: "일본 좌선 명상에 대해 알아야 할 것은?" },
      { emoji: "✍️", label: "서도", query: "일본 서예 체험에 대해 알아야 할 것은?" },
    ]},
    { emoji: "🏥", label: "긴급상황", sub: [
      { emoji: "🏥", label: "병원", query: "외국인이 일본에서 병원을 이용하는 방법은?" },
      { emoji: "👮", label: "경찰", query: "일본에서 경찰에 연락하는 방법은?" },
      { emoji: "👜", label: "분실물", query: "일본에서 물건을 잃어버렸을 때는?" },
      { emoji: "🚨", label: "재해", query: "일본에서 지진이나 재해가 발생했을 때는?" },
    ]},
  ],
};

const OTHER_SCENES = {
  "zh-tw": [], th: [], fr: [],
  en: [
    { emoji: "🚕", label: "Taxi", sub: [
      { emoji: "🚕", label: "How to use", query: "How do I use a taxi in Japan?" },
      { emoji: "💴", label: "Fare", query: "How much do taxis cost in Japan?" },
      { emoji: "📱", label: "Apps", query: "What taxi apps can I use in Japan?" },
      { emoji: "🤝", label: "Tips", query: "Should I tip taxi drivers in Japan?" },
    ]},
    { emoji: "🏧", label: "Money", sub: [
      { emoji: "🏧", label: "ATM", query: "How do I use ATMs in Japan as a foreigner?" },
      { emoji: "💱", label: "Exchange", query: "Where can I exchange money in Japan?" },
      { emoji: "💳", label: "Cards", query: "Can I use credit cards in Japan?" },
      { emoji: "💴", label: "Cash", query: "How much cash should I carry in Japan?" },
    ]},
    { emoji: "🚽", label: "Toilet", sub: [
      { emoji: "🚿", label: "Washlet", query: "How do I use a Japanese washlet toilet?" },
      { emoji: "🗺️", label: "Find one", query: "How do I find public toilets in Japan?" },
      { emoji: "🧻", label: "Etiquette", query: "What is the toilet etiquette in Japan?" },
    ]},
    { emoji: "📶", label: "Internet", sub: [
      { emoji: "📱", label: "SIM card", query: "How do I get a SIM card in Japan?" },
      { emoji: "📶", label: "Pocket WiFi", query: "How do I rent pocket WiFi in Japan?" },
      { emoji: "🆓", label: "Free WiFi", query: "Where can I find free WiFi in Japan?" },
    ]},
    { emoji: "🏠", label: "Stay", sub: [
      { emoji: "🏯", label: "Ryokan", query: "What are the etiquette rules at a Japanese ryokan?" },
      { emoji: "🏨", label: "Hotel", query: "What should I know about staying at a Japanese hotel?" },
      { emoji: "🏠", label: "Airbnb", query: "What should I know about Airbnb in Japan?" },
      { emoji: "💤", label: "Capsule", query: "How do I use a capsule hotel in Japan?" },
    ]},
    { emoji: "🗣️", label: "Language", sub: [
      { emoji: "👋", label: "Basic phrases", query: "What are the most useful Japanese phrases for tourists?" },
      { emoji: "🆘", label: "Help!", query: "How do I ask for help in Japanese?" },
      { emoji: "📱", label: "Translation apps", query: "What translation apps work best in Japan?" },
    ]},
    { emoji: "🎌", label: "Festivals", sub: [
      { emoji: "🎆", label: "Fireworks", query: "What should I know about Japanese fireworks festivals?" },
      { emoji: "🏮", label: "Street stalls", query: "How do I enjoy Japanese festival street stalls?" },
      { emoji: "💃", label: "Bon Odori", query: "What is Bon Odori and how do I participate?" },
      { emoji: "⛩️", label: "New Year", query: "What should I know about Japanese New Year celebrations?" },
    ]},
    { emoji: "🌸", label: "Seasons", sub: [
      { emoji: "🌸", label: "Spring", query: "What should I know about visiting Japan in spring?" },
      { emoji: "🌊", label: "Summer", query: "What should I know about visiting Japan in summer?" },
      { emoji: "🍁", label: "Autumn", query: "What should I know about visiting Japan in autumn?" },
      { emoji: "❄️", label: "Winter", query: "What should I know about visiting Japan in winter?" },
    ]},
    { emoji: "🗾", label: "Regions", sub: [
      { emoji: "🗼", label: "Tokyo", query: "What are the must-know tips for visiting Tokyo?" },
      { emoji: "⛩️", label: "Kyoto", query: "What are the must-know tips for visiting Kyoto?" },
      { emoji: "🦌", label: "Osaka", query: "What are the must-know tips for visiting Osaka?" },
      { emoji: "🕊️", label: "Hiroshima", query: "What are the must-know tips for visiting Hiroshima?" },
      { emoji: "🗻", label: "Mt.Fuji", query: "What should I know about visiting Mt. Fuji?" },
      { emoji: "❄️", label: "Hokkaido", query: "What are the must-know tips for visiting Hokkaido?" },
      { emoji: "🦌", label: "Nara", query: "What are the must-know tips for visiting Nara?" },
      { emoji: "🌊", label: "Okinawa", query: "What are the must-know tips for visiting Okinawa?" },
      { emoji: "🍜", label: "Fukuoka", query: "What are the must-know tips for visiting Fukuoka?" },
    ]},
  ],
  zh: [
    { emoji: "🚕", label: "出租车", sub: [
      { emoji: "🚕", label: "使用方法", query: "如何在日本使用出租车？" },
      { emoji: "💴", label: "费用", query: "日本出租车费用是多少？" },
      { emoji: "📱", label: "打车软件", query: "在日本可以使用哪些打车软件？" },
      { emoji: "🤝", label: "小费", query: "在日本需要给出租车司机小费吗？" },
    ]},
    { emoji: "🏧", label: "金钱", sub: [
      { emoji: "🏧", label: "ATM", query: "外国人如何在日本使用ATM？" },
      { emoji: "💱", label: "换汇", query: "在日本哪里可以换钱？" },
      { emoji: "💳", label: "信用卡", query: "在日本可以使用信用卡吗？" },
      { emoji: "💴", label: "现金", query: "在日本需要携带多少现金？" },
    ]},
    { emoji: "🚽", label: "厕所", sub: [
      { emoji: "🚿", label: "温水马桶", query: "如何使用日本温水马桶？" },
      { emoji: "🗺️", label: "找厕所", query: "如何在日本找到公共厕所？" },
      { emoji: "🧻", label: "礼仪", query: "日本的厕所礼仪是什么？" },
    ]},
    { emoji: "📶", label: "网络", sub: [
      { emoji: "📱", label: "SIM卡", query: "如何在日本购买SIM卡？" },
      { emoji: "📶", label: "随身WiFi", query: "如何在日本租用随身WiFi？" },
      { emoji: "🆓", label: "免费WiFi", query: "在日本哪里可以找到免费WiFi？" },
    ]},
    { emoji: "🏠", label: "住宿", sub: [
      { emoji: "🏯", label: "旅馆", query: "在日本旅馆住宿有哪些礼仪？" },
      { emoji: "🏨", label: "酒店", query: "在日本酒店住宿需要了解什么？" },
      { emoji: "🏠", label: "民宿", query: "在日本使用Airbnb需要了解什么？" },
      { emoji: "💤", label: "胶囊旅馆", query: "如何使用日本胶囊旅馆？" },
    ]},
    { emoji: "🗣️", label: "语言", sub: [
      { emoji: "👋", label: "基本用语", query: "游客最常用的日语短句有哪些？" },
      { emoji: "🆘", label: "求助", query: "如何用日语寻求帮助？" },
      { emoji: "📱", label: "翻译软件", query: "在日本哪些翻译软件最好用？" },
    ]},
    { emoji: "🎌", label: "祭典", sub: [
      { emoji: "🎆", label: "烟火大会", query: "关于日本烟火大会需要了解什么？" },
      { emoji: "🏮", label: "摊位", query: "如何享用日本祭典摊位？" },
      { emoji: "💃", label: "盂兰盆舞", query: "什么是盂兰盆舞？如何参加？" },
      { emoji: "⛩️", label: "新年", query: "关于日本新年庆典需要了解什么？" },
    ]},
    { emoji: "🌸", label: "季节", sub: [
      { emoji: "🌸", label: "春天", query: "春天去日本旅游需要了解什么？" },
      { emoji: "🌊", label: "夏天", query: "夏天去日本旅游需要了解什么？" },
      { emoji: "🍁", label: "秋天", query: "秋天去日本旅游需要了解什么？" },
      { emoji: "❄️", label: "冬天", query: "冬天去日本旅游需要了解什么？" },
    ]},
    { emoji: "🗾", label: "地方", sub: [
      { emoji: "🗼", label: "东京", query: "去东京旅游需要了解哪些重要信息？" },
      { emoji: "⛩️", label: "京都", query: "去京都旅游需要了解哪些重要信息？" },
      { emoji: "🦌", label: "大阪", query: "去大阪旅游需要了解哪些重要信息？" },
      { emoji: "🕊️", label: "广岛", query: "去广岛旅游需要了解哪些重要信息？" },
      { emoji: "🗻", label: "富士山", query: "去富士山需要了解什么？" },
      { emoji: "❄️", label: "北海道", query: "去北海道旅游需要了解哪些重要信息？" },
      { emoji: "🦌", label: "奈良", query: "去奈良旅游需要了解哪些重要信息？" },
      { emoji: "🌊", label: "冲绳", query: "去冲绳旅游需要了解哪些重要信息？" },
      { emoji: "🍜", label: "福冈", query: "去福冈旅游需要了解哪些重要信息？" },
    ]},
  ],
  ko: [
    { emoji: "🚕", label: "택시", sub: [
      { emoji: "🚕", label: "이용방법", query: "일본에서 택시 이용 방법은?" },
      { emoji: "💴", label: "요금", query: "일본 택시 요금은 얼마인가요?" },
      { emoji: "📱", label: "앱", query: "일본에서 사용할 수 있는 택시 앱은?" },
      { emoji: "🤝", label: "팁", query: "일본 택시 기사에게 팁을 줘야 하나요?" },
    ]},
    { emoji: "🏧", label: "돈", sub: [
      { emoji: "🏧", label: "ATM", query: "일본에서 외국인이 ATM 사용하는 방법은?" },
      { emoji: "💱", label: "환전", query: "일본에서 환전하는 곳은?" },
      { emoji: "💳", label: "카드", query: "일본에서 신용카드를 사용할 수 있나요?" },
      { emoji: "💴", label: "현금", query: "일본에서 얼마의 현금을 가지고 다녀야 하나요?" },
    ]},
    { emoji: "🚽", label: "화장실", sub: [
      { emoji: "🚿", label: "비데", query: "일본 비데 화장실 사용 방법은?" },
      { emoji: "🗺️", label: "찾기", query: "일본에서 공중화장실 찾는 방법은?" },
      { emoji: "🧻", label: "예절", query: "일본 화장실 예절은?" },
    ]},
    { emoji: "📶", label: "인터넷", sub: [
      { emoji: "📱", label: "SIM카드", query: "일본에서 SIM카드 구매 방법은?" },
      { emoji: "📶", label: "포켓WiFi", query: "일본에서 포켓WiFi 렌탈 방법은?" },
      { emoji: "🆓", label: "무료WiFi", query: "일본에서 무료WiFi 찾는 방법은?" },
    ]},
    { emoji: "🏠", label: "숙박", sub: [
      { emoji: "🏯", label: "료칸", query: "일본 료칸에서의 예절은?" },
      { emoji: "🏨", label: "호텔", query: "일본 호텔 숙박 시 알아야 할 것은?" },
      { emoji: "🏠", label: "에어비앤비", query: "일본에서 에어비앤비 이용 시 알아야 할 것은?" },
      { emoji: "💤", label: "캡슐호텔", query: "일본 캡슐호텔 이용 방법은?" },
    ]},
    { emoji: "🗣️", label: "언어", sub: [
      { emoji: "👋", label: "기본회화", query: "관광객에게 유용한 일본어 표현은?" },
      { emoji: "🆘", label: "도움요청", query: "일본어로 도움을 요청하는 방법은?" },
      { emoji: "📱", label: "번역앱", query: "일본에서 가장 유용한 번역 앱은?" },
    ]},
    { emoji: "🎌", label: "축제", sub: [
      { emoji: "🎆", label: "불꽃축제", query: "일본 불꽃축제에 대해 알아야 할 것은?" },
      { emoji: "🏮", label: "포장마차", query: "일본 축제 포장마차를 즐기는 방법은?" },
      { emoji: "💃", label: "봉오도리", query: "봉오도리란 무엇이며 어떻게 참가하나요?" },
      { emoji: "⛩️", label: "새해", query: "일본 새해 행사에 대해 알아야 할 것은?" },
    ]},
    { emoji: "🌸", label: "계절", sub: [
      { emoji: "🌸", label: "봄", query: "봄에 일본을 방문할 때 알아야 할 것은?" },
      { emoji: "🌊", label: "여름", query: "여름에 일본을 방문할 때 알아야 할 것은?" },
      { emoji: "🍁", label: "가을", query: "가을에 일본을 방문할 때 알아야 할 것은?" },
      { emoji: "❄️", label: "겨울", query: "겨울에 일본을 방문할 때 알아야 할 것은?" },
    ]},
    { emoji: "🗾", label: "지역", sub: [
      { emoji: "🗼", label: "도쿄", query: "도쿄 여행 시 꼭 알아야 할 정보는?" },
      { emoji: "⛩️", label: "교토", query: "교토 여행 시 꼭 알아야 할 정보는?" },
      { emoji: "🦌", label: "오사카", query: "오사카 여행 시 꼭 알아야 할 정보는?" },
      { emoji: "🕊️", label: "히로시마", query: "히로시마 여행 시 꼭 알아야 할 정보는?" },
      { emoji: "🗻", label: "후지산", query: "후지산 방문 시 알아야 할 것은?" },
      { emoji: "❄️", label: "홋카이도", query: "홋카이도 여행 시 꼭 알아야 할 정보는?" },
      { emoji: "🦌", label: "나라", query: "나라 여행 시 꼭 알아야 할 정보는?" },
      { emoji: "🌊", label: "오키나와", query: "오키나와 여행 시 꼭 알아야 할 정보는?" },
      { emoji: "🍜", label: "후쿠오카", query: "후쿠오카 여행 시 꼭 알아야 할 정보는?" },
    ]},
  ],
};

const TRANSLATIONS = {
  en: {
    title: "Way of Japan", subtitle: "Your Cultural Guide 🌸",
    quick: "🌸 Quick", deep: "🍵 Deep",
    placeholder: "Ask Kokoro anything about Japan...", send: "Send",
    thinking: "Kokoro is thinking... 🌸",
    freeLeft: (n, t) => `Free: ${n} / ${t} messages left today`,
    limitTitle: "Daily limit reached! 🌸", limitDesc: "You've used all 5 free messages for today.",
    weeklyPass: "Weekly Pass", weeklyPrice: "$3.99", weeklyDesc: "Unlimited for 7 days",
    monthly: "Monthly", monthlyPrice: "$4.99", monthlyDesc: "Unlimited + Deep mode",
    getWeekly: "Get Weekly Pass", getMonthly: "Get Monthly", maybeLater: "Maybe later",
    greeting: "Konnichiwa! 🌸 I'm Kokoro, your Japanese culture guide. Ask me anything about Japan — customs, food, travel tips, and more!",
    other: "More", capture: "⬤ Capture", analyze: "🔍 Analyze", retake: "Retake",
    thinking2: "Kokoro is reading... 🌸",
    error: "Gomen nasai! Something went wrong. Please try again 🙏",
    sorry: "Sorry, I couldn't understand that. Please try again!",
  },
  zh: {
    title: "日本之道", subtitle: "您的文化向导 🌸",
    quick: "🌸 快速", deep: "🍵 深度",
    placeholder: "向Kokoro询问任何关于日本的问题...", send: "发送",
    thinking: "Kokoro正在思考... 🌸",
    freeLeft: (n, t) => `免费：今天还剩 ${n} / ${t} 条消息`,
    limitTitle: "已达到每日限制！🌸", limitDesc: "您今天的5条免费消息已用完。",
    weeklyPass: "周卡", weeklyPrice: "$3.99", weeklyDesc: "7天无限使用",
    monthly: "月卡", monthlyPrice: "$4.99", monthlyDesc: "无限使用 + 深度模式",
    getWeekly: "获取周卡", getMonthly: "获取月卡", maybeLater: "稍后再说",
    greeting: "你好！🌸 我是Kokoro，您的日本文化向导。随时向我询问关于日本的任何问题！",
    other: "更多", capture: "⬤ 拍照", analyze: "🔍 分析", retake: "重拍",
    thinking2: "Kokoro正在阅读... 🌸",
    error: "对不起！出了点问题，请再试一次 🙏",
    sorry: "抱歉，我没能理解。请再试一次！",
  },
  ko: {
    title: "일본의 길", subtitle: "당신의 문화 가이드 🌸",
    quick: "🌸 빠른", deep: "🍵 깊은",
    placeholder: "일본에 대해 Kokoro에게 무엇이든 물어보세요...", send: "전송",
    thinking: "Kokoro가 생각 중... 🌸",
    freeLeft: (n, t) => `무료: 오늘 ${n} / ${t} 메시지 남음`,
    limitTitle: "일일 한도 도달! 🌸", limitDesc: "오늘의 무료 메시지 5개를 모두 사용했습니다.",
    weeklyPass: "주간 패스", weeklyPrice: "$3.99", weeklyDesc: "7일 무제한",
    monthly: "월간", monthlyPrice: "$4.99", monthlyDesc: "무제한 + 깊은 모드",
    getWeekly: "주간 패스 구매", getMonthly: "월간 구매", maybeLater: "나중에",
    greeting: "안녕하세요! 🌸 저는 Kokoro, 일본 문화 가이드입니다. 무엇이든 물어보세요!",
    other: "더보기", capture: "⬤ 촬영", analyze: "🔍 분석", retake: "다시 찍기",
    thinking2: "Kokoro가 읽는 중... 🌸",
    error: "죄송합니다! 문제가 발생했습니다. 다시 시도해주세요 🙏",
    sorry: "죄송합니다, 이해하지 못했습니다. 다시 시도해주세요!",
  },
  "zh-tw": {
    title: "日本之道", subtitle: "您的文化嚮導 🌸",
    quick: "🌸 快速", deep: "🍵 深度",
    placeholder: "向Kokoro詢問任何關於日本的問題...", send: "發送",
    thinking: "Kokoro正在思考... 🌸",
    freeLeft: (n, t) => `免費：今天還剩 ${n} / ${t} 則訊息`,
    limitTitle: "已達到每日限制！🌸", limitDesc: "您今天的5則免費訊息已用完。",
    weeklyPass: "週票", weeklyPrice: "$3.99", weeklyDesc: "7天無限使用",
    monthly: "月票", monthlyPrice: "$4.99", monthlyDesc: "無限使用 + 深度模式",
    getWeekly: "購買週票", getMonthly: "購買月票", maybeLater: "稍後再說",
    greeting: "你好！🌸 我是Kokoro，您的日本文化嚮導。隨時向我詢問關於日本的任何問題！",
    other: "更多", capture: "⬤ 拍照", analyze: "🔍 分析", retake: "重拍",
    thinking2: "Kokoro正在閱讀... 🌸",
    error: "對不起！出了點問題，請再試一次 🙏",
    sorry: "抱歉，我沒能理解。請再試一次！",
  },
  th: {
    title: "วิถีญี่ปุ่น", subtitle: "ไกด์วัฒนธรรมของคุณ 🌸",
    quick: "🌸 เร็ว", deep: "🍵 ลึก",
    placeholder: "ถาม Kokoro เกี่ยวกับญี่ปุ่น...", send: "ส่ง",
    thinking: "Kokoro กำลังคิด... 🌸",
    freeLeft: (n, t) => `ฟรี: เหลือ ${n} / ${t} ข้อความวันนี้`,
    limitTitle: "ถึงขีดจำกัดรายวัน! 🌸", limitDesc: "คุณใช้ข้อความฟรี 5 ข้อความในวันนี้หมดแล้ว",
    weeklyPass: "พาสรายสัปดาห์", weeklyPrice: "$3.99", weeklyDesc: "ไม่จำกัด 7 วัน",
    monthly: "รายเดือน", monthlyPrice: "$4.99", monthlyDesc: "ไม่จำกัด + โหมดลึก",
    getWeekly: "ซื้อพาสรายสัปดาห์", getMonthly: "ซื้อรายเดือน", maybeLater: "ไว้ทีหลัง",
    greeting: "สวัสดี! 🌸 ฉันคือ Kokoro ไกด์วัฒนธรรมญี่ปุ่นของคุณ ถามฉันได้ทุกเรื่องเกี่ยวกับญี่ปุ่น!",
    other: "เพิ่มเติม", capture: "⬤ ถ่ายภาพ", analyze: "🔍 วิเคราะห์", retake: "ถ่ายใหม่",
    thinking2: "Kokoro กำลังอ่าน... 🌸",
    error: "ขอโทษ! เกิดข้อผิดพลาด กรุณาลองใหม่ 🙏",
    sorry: "ขอโทษ ฉันไม่เข้าใจ กรุณาลองใหม่!",
  },
  fr: {
    title: "Voie du Japon", subtitle: "Votre Guide Culturel 🌸",
    quick: "🌸 Rapide", deep: "🍵 Approfondi",
    placeholder: "Demandez à Kokoro tout sur le Japon...", send: "Envoyer",
    thinking: "Kokoro réfléchit... 🌸",
    freeLeft: (n, t) => `Gratuit: ${n} / ${t} messages restants aujourd'hui`,
    limitTitle: "Limite quotidienne atteinte! 🌸", limitDesc: "Vous avez utilisé vos 5 messages gratuits aujourd'hui.",
    weeklyPass: "Pass Semaine", weeklyPrice: "$3.99", weeklyDesc: "Illimité pendant 7 jours",
    monthly: "Mensuel", monthlyPrice: "$4.99", monthlyDesc: "Illimité + Mode approfondi",
    getWeekly: "Obtenir le Pass Semaine", getMonthly: "Obtenir le Mensuel", maybeLater: "Plus tard",
    greeting: "Konnichiwa! 🌸 Je suis Kokoro, votre guide culturel japonais. Posez-moi toutes vos questions sur le Japon!",
    other: "Plus", capture: "⬤ Capturer", analyze: "🔍 Analyser", retake: "Reprendre",
    thinking2: "Kokoro lit... 🌸",
    error: "Gomen nasai! Une erreur s'est produite. Veuillez réessayer 🙏",
    sorry: "Désolé, je n'ai pas compris. Veuillez réessayer!",
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

function saveMessages(msgs) {
  try { localStorage.setItem("woj_messages", JSON.stringify(msgs)); } catch {}
}

function loadMessages(greeting) {
  try {
    const stored = localStorage.getItem("woj_messages");
    if (stored) return JSON.parse(stored);
  } catch {}
  return [{ role: "assistant", content: greeting }];
}

export default function App() {
  const [language, setLanguage] = useState("en");
  const t = TRANSLATIONS[language];
  const scenes = SCENE_DATA[language] || [];
  const otherScenes = OTHER_SCENES[language] || [];

  const [messages, setMessages] = useState(() => loadMessages(t.greeting));
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("quick");
  const [loading, setLoading] = useState(false);
  const [dailyCount, setDailyCount] = useState(getDailyCount());
  const [showPaywall, setShowPaywall] = useState(false);
  const [useReal, setUseReal] = useState(false);
  const [openScene, setOpenScene] = useState(null);
  const [openOther, setOpenOther] = useState(null);
  const [showOtherList, setShowOtherList] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImg, setCapturedImg] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const bottomRef = useRef(null);
  const kokoroImg = useReal ? "/images/kokoro-real.png" : "/images/kokoro-chibi.png";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    setMessages([{ role: "assistant", content: TRANSLATIONS[language].greeting }]);
  }, [language]);

  useEffect(() => {
    if (showCamera) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          setCameraStream(stream);
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(() => alert("Camera access denied."));
    } else {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
        setCameraStream(null);
      }
      setCapturedImg(null);
    }
  }, [showCamera]);

  async function sendMessage(text) {
  const userText = text || input.trim();
  if (!userText) return;

  const currentCount = getDailyCount();
  if (mode === "quick" && currentCount >= DAILY_LIMIT) {
    setShowPaywall(true);
    return;
  }

  const newMessages = [...messages, { role: "user", content: userText }];
  setMessages(newMessages);
  setInput("");
  setLoading(true);

  const newCount = incrementDailyCount();
  setDailyCount(newCount);

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
  setOpenOther(null);
  setShowOtherList(false);
  const newMessages = [...messages, { role: "user", content: query }];
  setMessages(newMessages);
  setLoading(true);
  incrementDailyCount();
  setDailyCount(getDailyCount());
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

  async function analyzeImage() {
    if (!capturedImg) return;
    const imgMsg = { role: "user", type: "image", content: capturedImg.dataUrl };
    const newMessages = [...messages, imgMsg];
    setMessages(newMessages);
    setShowCamera(false);
    setCapturedImg(null);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: [
            { type: "image", source: { type: "base64", media_type: "image/jpeg", data: capturedImg.base64 } },
            { type: "text", text: "Please translate any Japanese text in this image and explain the cultural context." },
          ]}],
          mode: "deep", language,
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I couldn't analyze this image.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: t.error }]);
    } finally {
      setLoading(false);
    }
  }

  function capturePhoto() {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    const base64 = dataUrl.split(",")[1];
    setCapturedImg({ dataUrl, base64 });
    cameraStream?.getTracks().forEach((track) => track.stop());
  }

  function renderBubble(content) {
    return content.split('\n').map((line, j) => {
      if (line === '') return <div key={j} style={{ height: '8px' }} />;
      const isBold = line.startsWith('## ') || line.startsWith('**');
      const cleaned = line.replace(/^##\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1');
      const isBullet = line.startsWith('- ');
      const bulletText = isBullet ? cleaned.replace(/^-\s*/, '') : cleaned;
      if (isBullet) return <p key={j} style={{ margin: '2px 0', paddingLeft: '12px', borderLeft: '2px solid #e8a4b8' }}>{bulletText}</p>;
      if (isBold) return <p key={j} style={{ margin: '6px 0 2px', fontWeight: '700', color: '#c4758f' }}>{cleaned}</p>;
      return <p key={j} style={{ margin: '2px 0' }}>{cleaned}</p>;
    });
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
          <option value="zh-tw">🇹🇼 TW</option>
          <option value="ko">🇰🇷 KO</option>
          <option value="th">🇹🇭 TH</option>
          <option value="fr">🇫🇷 FR</option>
        </select>
      </header>

      <div className="mode-toggle">
        <button className={`mode-btn ${mode === "quick" ? "active" : ""}`} onClick={() => setMode("quick")}>{t.quick}</button>
        <button className={`mode-btn ${mode === "deep" ? "active" : ""}`} onClick={() => setMode("deep")}>{t.deep}</button>
      </div>

      <div className="main-layout">
        <div className="left-col">
          <div className="scene-buttons-vertical">
            {scenes.map((s, i) => (
              <button
                key={s.label}
                className={`scene-btn-vertical ${openScene === i ? "active" : ""}`}
                onClick={() => { setOpenScene(openScene === i ? null : i); setShowOtherList(false); setOpenOther(null); }}
              >
                <span className="scene-btn-emoji">{s.emoji}</span>
                <span>{s.label}</span>
              </button>
            ))}
            <button
              className={`scene-btn-vertical ${showOtherList ? "active" : ""}`}
              onClick={() => { setShowOtherList(!showOtherList); setOpenScene(null); setOpenOther(null); }}
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

        <div className="right-col">
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

          {showOtherList && openOther === null && (
            <div className="accordion">
              <p className="accordion-title">➕ {t.other}</p>
              <div className="accordion-grid">
                {otherScenes.map((s, i) => (
                  <button key={s.label} className="accordion-btn" onClick={() => setOpenOther(i)}>
                    <span>{s.emoji}</span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showOtherList && openOther !== null && (
            <div className="accordion">
              <button className="accordion-back" onClick={() => setOpenOther(null)}>← {t.other}</button>
              <p className="accordion-title">{otherScenes[openOther].emoji} {otherScenes[openOther].label}</p>
              <div className="accordion-grid">
                {otherScenes[openOther].sub.map((sub) => (
                  <button key={sub.label} className="accordion-btn" onClick={() => sendScene(sub.query)}>
                    <span>{sub.emoji}</span>
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showCamera && (
            <div className="inline-camera">
              {!capturedImg ? (
                <>
                  <video ref={videoRef} autoPlay playsInline className="inline-video" />
                  <button className="inline-capture-btn" onClick={capturePhoto}>⬤ {t.capture}</button>
                  <canvas ref={canvasRef} style={{ display: "none" }} />
                </>
              ) : (
                <>
                  <img src={capturedImg.dataUrl} alt="captured" className="inline-preview" />
                  <div className="inline-camera-btns">
                    <button className="cam-btn" onClick={analyzeImage}>{t.analyze}</button>
                    <button className="cam-btn secondary" onClick={() => setCapturedImg(null)}>{t.retake}</button>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="chat-area">
            {messages.map((msg, i) => (
              <div key={i} className={`message-row ${msg.role}`}>
                {msg.type === "image" ? (
                  <img src={msg.content} alt="captured" className="chat-captured-img" />
                ) : (
                  <div className={`bubble ${msg.role}`}>{renderBubble(msg.content)}</div>
                )}
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
        <button className="cam-inline-btn" onClick={() => setShowCamera(!showCamera)}>📷</button>
        <button className="send-btn" onClick={() => sendMessage()}>{t.send}</button>
      </div>

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
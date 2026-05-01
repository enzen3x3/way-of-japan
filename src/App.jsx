import { useState, useRef, useEffect } from "react";
import "./App.css";
import LegalPage from "./LegalPage";

const SCENE_DATA = {
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
    { emoji: "🏥", label: "紧急情况", sub: [
      { emoji: "🏥", label: "医院", query: "外国人如何在日本使用医院？" },
      { emoji: "👮", label: "警察", query: "在日本如何联系警察？" },
      { emoji: "👜", label: "失物", query: "在日本丢失物品怎么办？" },
      { emoji: "🚨", label: "灾害", query: "在日本遇到地震或灾害时该怎么办？" },
    ]},
  ],
  "zh-tw": [
    { emoji: "🍜", label: "餐飲", sub: [
      { emoji: "🍣", label: "壽司", query: "在日本吃壽司有哪些禮儀？" },
      { emoji: "🍜", label: "拉麵", query: "在日本如何正確吃拉麵？" },
      { emoji: "🥩", label: "燒肉", query: "如何正確享用日式燒肉？" },
      { emoji: "🍤", label: "天婦羅", query: "在日本如何正確吃天婦羅？" },
      { emoji: "🐟", label: "鰻魚", query: "在日本如何正確吃鰻魚飯？" },
      { emoji: "🍱", label: "壽喜鍋", query: "如何正確享用日式壽喜鍋？" },
      { emoji: "🍶", label: "居酒屋", query: "在日本居酒屋有哪些規則和禮儀？" },
    ]},
    { emoji: "🚃", label: "電車", sub: [
      { emoji: "🎫", label: "買票", query: "如何在日本購買電車票？" },
      { emoji: "🚃", label: "禮儀", query: "日本電車上有哪些禮儀？" },
      { emoji: "🗺️", label: "路線圖", query: "如何看懂日本電車路線圖？" },
    ]},
    { emoji: "♨️", label: "溫泉", sub: [
      { emoji: "🛁", label: "使用方法", query: "如何正確使用日本溫泉？" },
      { emoji: "🔱", label: "刺青", query: "有刺青能進日本溫泉嗎？" },
      { emoji: "👫", label: "混浴", query: "關於日本混浴溫泉需要了解什麼？" },
      { emoji: "🏨", label: "旅館", query: "在日本旅館住宿有哪些禮儀？" },
    ]},
    { emoji: "🏯", label: "觀光", sub: [
      { emoji: "⛩️", label: "神社", query: "如何正確參拜日本神社？" },
      { emoji: "🛕", label: "寺廟", query: "如何正確參觀日本寺廟？" },
      { emoji: "🏯", label: "城堡", query: "參觀日本城堡需要注意什麼？" },
      { emoji: "🌿", label: "庭園", query: "在日本庭園有哪些禮儀？" },
    ]},
    { emoji: "🛍️", label: "購物", sub: [
      { emoji: "🧾", label: "免稅", query: "外國遊客如何在日本享受免稅購物？" },
      { emoji: "💴", label: "百元店", query: "關於日本百元店需要了解什麼？" },
      { emoji: "🏪", label: "便利店", query: "如何使用日本便利店？" },
      { emoji: "🏬", label: "百貨店", query: "在日本百貨店有哪些禮儀？" },
    ]},
    { emoji: "🏥", label: "緊急情況", sub: [
      { emoji: "🏥", label: "醫院", query: "外國人如何在日本使用醫院？" },
      { emoji: "👮", label: "警察", query: "在日本如何聯繫警察？" },
      { emoji: "👜", label: "失物", query: "在日本丟失物品怎麼辦？" },
      { emoji: "🚨", label: "災害", query: "在日本遇到地震或災害時該怎麼辦？" },
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
    { emoji: "🏥", label: "긴급상황", sub: [
      { emoji: "🏥", label: "병원", query: "외국인이 일본에서 병원을 이용하는 방법은?" },
      { emoji: "👮", label: "경찰", query: "일본에서 경찰에 연락하는 방법은?" },
      { emoji: "👜", label: "분실물", query: "일본에서 물건을 잃어버렸을 때는?" },
      { emoji: "🚨", label: "재해", query: "일본에서 지진이나 재해가 발생했을 때는?" },
    ]},
  ],
  th: [
    { emoji: "🍜", label: "อาหาร", sub: [
      { emoji: "🍣", label: "ซูชิ", query: "มารยาทในการกินซูชิในญี่ปุ่นคืออะไร?" },
      { emoji: "🍜", label: "ราเมน", query: "วิธีกินราเมนอย่างถูกต้องในญี่ปุ่น?" },
      { emoji: "🥩", label: "ยากินิกุ", query: "วิธีกินยากินิกุอย่างถูกต้อง?" },
      { emoji: "🍤", label: "เทมปุระ", query: "วิธีกินเทมปุระอย่างถูกต้องในญี่ปุ่น?" },
      { emoji: "🐟", label: "ปลาไหล", query: "วิธีกินข้าวหน้าปลาไหลอย่างถูกต้องในญี่ปุ่น?" },
      { emoji: "🍱", label: "สุกียากี้", query: "วิธีกินสุกียากี้อย่างถูกต้อง?" },
      { emoji: "🍶", label: "อิซากายะ", query: "กฎและมารยาทที่ร้านอิซากายะในญี่ปุ่นคืออะไร?" },
    ]},
    { emoji: "🚃", label: "รถไฟ", sub: [
      { emoji: "🎫", label: "ตั๋ว", query: "วิธีซื้อตั๋วรถไฟในญี่ปุ่น?" },
      { emoji: "🚃", label: "มารยาท", query: "มารยาทบนรถไฟญี่ปุ่นคืออะไร?" },
      { emoji: "🗺️", label: "แผนที่", query: "วิธีอ่านแผนที่เส้นทางรถไฟญี่ปุ่น?" },
    ]},
    { emoji: "♨️", label: "ออนเซ็น", sub: [
      { emoji: "🛁", label: "วิธีใช้", query: "วิธีใช้ออนเซ็นญี่ปุ่นอย่างถูกต้อง?" },
      { emoji: "🔱", label: "รอยสัก", query: "กฎเกี่ยวกับรอยสักที่ออนเซ็นญี่ปุ่น?" },
      { emoji: "👫", label: "อาบรวม", query: "ควรรู้อะไรเกี่ยวกับออนเซ็นอาบรวมในญี่ปุ่น?" },
      { emoji: "🏨", label: "เรียวกัง", query: "มารยาทที่เรียวกังญี่ปุ่นคืออะไร?" },
    ]},
    { emoji: "🏯", label: "ท่องเที่ยว", sub: [
      { emoji: "⛩️", label: "ศาลเจ้า", query: "วิธีเยี่ยมชมศาลเจ้าญี่ปุ่นอย่างถูกต้อง?" },
      { emoji: "🛕", label: "วัด", query: "วิธีเยี่ยมชมวัดญี่ปุ่นอย่างถูกต้อง?" },
      { emoji: "🏯", label: "ปราสาท", query: "ควรรู้อะไรเมื่อเยี่ยมชมปราสาทญี่ปุ่น?" },
      { emoji: "🌿", label: "สวน", query: "มารยาทในสวนญี่ปุ่นคืออะไร?" },
    ]},
    { emoji: "🛍️", label: "ช้อปปิ้ง", sub: [
      { emoji: "🧾", label: "ปลอดภาษี", query: "นักท่องเที่ยวช้อปปิ้งปลอดภาษีในญี่ปุ่นอย่างไร?" },
      { emoji: "💴", label: "ร้าน 100 เยน", query: "ควรรู้อะไรเกี่ยวกับร้าน 100 เยนในญี่ปุ่น?" },
      { emoji: "🏪", label: "ร้านสะดวกซื้อ", query: "วิธีใช้ร้านสะดวกซื้อญี่ปุ่น?" },
      { emoji: "🏬", label: "ห้างสรรพสินค้า", query: "มารยาทที่ห้างสรรพสินค้าญี่ปุ่นคืออะไร?" },
    ]},
    { emoji: "🏥", label: "ฉุกเฉิน", sub: [
      { emoji: "🏥", label: "โรงพยาบาล", query: "ชาวต่างชาติใช้โรงพยาบาลในญี่ปุ่นอย่างไร?" },
      { emoji: "👮", label: "ตำรวจ", query: "ติดต่อตำรวจในญี่ปุ่นอย่างไร?" },
      { emoji: "👜", label: "ของหาย", query: "ทำอย่างไรเมื่อทำของหายในญี่ปุ่น?" },
      { emoji: "🚨", label: "ภัยพิบัติ", query: "ทำอย่างไรเมื่อเกิดแผ่นดินไหวในญี่ปุ่น?" },
    ]},
  ],
  fr: [
    { emoji: "🍜", label: "Restauration", sub: [
      { emoji: "🍣", label: "Sushi", query: "Quelles sont les règles d'étiquette pour manger des sushis au Japon?" },
      { emoji: "🍜", label: "Ramen", query: "Comment manger correctement des ramen au Japon?" },
      { emoji: "🥩", label: "Yakiniku", query: "Comment profiter correctement du yakiniku japonais?" },
      { emoji: "🍤", label: "Tempura", query: "Comment manger correctement la tempura au Japon?" },
      { emoji: "🐟", label: "Unagi", query: "Comment manger correctement l'unagi au Japon?" },
      { emoji: "🍱", label: "Sukiyaki", query: "Comment profiter correctement du sukiyaki au Japon?" },
      { emoji: "🍶", label: "Izakaya", query: "Quelles sont les règles dans un izakaya japonais?" },
    ]},
    { emoji: "🚃", label: "Train", sub: [
      { emoji: "🎫", label: "Billets", query: "Comment acheter des billets de train au Japon?" },
      { emoji: "🚃", label: "Étiquette", query: "Quelles sont les règles dans les trains japonais?" },
      { emoji: "🗺️", label: "Itinéraires", query: "Comment lire un plan de métro japonais?" },
    ]},
    { emoji: "♨️", label: "Onsen", sub: [
      { emoji: "🛁", label: "Utilisation", query: "Comment utiliser correctement un onsen japonais?" },
      { emoji: "🔱", label: "Tatouages", query: "Quelles sont les règles sur les tatouages dans les onsens?" },
      { emoji: "👫", label: "Mixte", query: "Que savoir sur les bains mixtes au Japon?" },
      { emoji: "🏨", label: "Ryokan", query: "Quelles sont les règles d'étiquette dans un ryokan?" },
    ]},
    { emoji: "🏯", label: "Tourisme", sub: [
      { emoji: "⛩️", label: "Sanctuaire", query: "Comment visiter correctement un sanctuaire japonais?" },
      { emoji: "🛕", label: "Temple", query: "Comment visiter correctement un temple japonais?" },
      { emoji: "🏯", label: "Château", query: "Que savoir lors de la visite d'un château japonais?" },
      { emoji: "🌿", label: "Jardin", query: "Quelles sont les règles dans les jardins japonais?" },
    ]},
    { emoji: "🛍️", label: "Shopping", sub: [
      { emoji: "🧾", label: "Détaxe", query: "Comment faire du shopping détaxé au Japon?" },
      { emoji: "💴", label: "100¥ Shop", query: "Que savoir sur les magasins à 100 yens?" },
      { emoji: "🏪", label: "Konbini", query: "Comment utiliser un konbini japonais?" },
      { emoji: "🏬", label: "Grand magasin", query: "Quelles sont les règles dans les grands magasins japonais?" },
    ]},
    { emoji: "🏥", label: "Urgences", sub: [
      { emoji: "🏥", label: "Hôpital", query: "Comment utiliser un hôpital au Japon en tant qu'étranger?" },
      { emoji: "👮", label: "Police", query: "Comment contacter la police au Japon?" },
      { emoji: "👜", label: "Objets perdus", query: "Que faire si je perds quelque chose au Japon?" },
      { emoji: "🚨", label: "Catastrophe", query: "Que faire en cas de tremblement de terre au Japon?" },
    ]},
  ],
};

const OTHER_SCENES = {
  en: [
    { emoji: "🎭", label: "Tradition", sub: [
      { emoji: "🍵", label: "Tea Ceremony", query: "How do I participate in a Japanese tea ceremony?" },
      { emoji: "👘", label: "Kimono", query: "How do I wear and behave in a kimono in Japan?" },
      { emoji: "🧘", label: "Zazen", query: "What should I know about zazen meditation in Japan?" },
      { emoji: "✍️", label: "Calligraphy", query: "What should I know about Japanese calligraphy experience?" },
    ]},
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
    { emoji: "🎭", label: "传统体验", sub: [
      { emoji: "🍵", label: "茶道", query: "如何参加日本茶道体验？" },
      { emoji: "👘", label: "和服", query: "穿和服时有哪些注意事项？" },
      { emoji: "🧘", label: "坐禅", query: "关于日本坐禅冥想需要了解什么？" },
      { emoji: "✍️", label: "书道", query: "关于日本书法体验需要了解什么？" },
    ]},
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
  "zh-tw": [
    { emoji: "🎭", label: "傳統體驗", sub: [
      { emoji: "🍵", label: "茶道", query: "如何參加日本茶道體驗？" },
      { emoji: "👘", label: "和服", query: "穿和服時有哪些注意事項？" },
      { emoji: "🧘", label: "坐禪", query: "關於日本坐禪冥想需要了解什麼？" },
      { emoji: "✍️", label: "書道", query: "關於日本書法體驗需要了解什麼？" },
    ]},
    { emoji: "🚕", label: "計程車", sub: [
      { emoji: "🚕", label: "使用方法", query: "如何在日本使用計程車？" },
      { emoji: "💴", label: "費用", query: "日本計程車費用是多少？" },
      { emoji: "📱", label: "叫車軟體", query: "在日本可以使用哪些叫車軟體？" },
      { emoji: "🤝", label: "小費", query: "在日本需要給計程車司機小費嗎？" },
    ]},
    { emoji: "🏧", label: "金錢", sub: [
      { emoji: "🏧", label: "ATM", query: "外國人如何在日本使用ATM？" },
      { emoji: "💱", label: "換匯", query: "在日本哪裡可以換錢？" },
      { emoji: "💳", label: "信用卡", query: "在日本可以使用信用卡嗎？" },
      { emoji: "💴", label: "現金", query: "在日本需要攜帶多少現金？" },
    ]},
    { emoji: "🚽", label: "廁所", sub: [
      { emoji: "🚿", label: "免治馬桶", query: "如何使用日本免治馬桶？" },
      { emoji: "🗺️", label: "找廁所", query: "如何在日本找到公共廁所？" },
      { emoji: "🧻", label: "禮儀", query: "日本的廁所禮儀是什麼？" },
    ]},
    { emoji: "📶", label: "網路", sub: [
      { emoji: "📱", label: "SIM卡", query: "如何在日本購買SIM卡？" },
      { emoji: "📶", label: "隨身WiFi", query: "如何在日本租用隨身WiFi？" },
      { emoji: "🆓", label: "免費WiFi", query: "在日本哪裡可以找到免費WiFi？" },
    ]},
    { emoji: "🏠", label: "住宿", sub: [
      { emoji: "🏯", label: "旅館", query: "在日本旅館住宿有哪些禮儀？" },
      { emoji: "🏨", label: "飯店", query: "在日本飯店住宿需要了解什麼？" },
      { emoji: "🏠", label: "民宿", query: "在日本使用Airbnb需要了解什麼？" },
      { emoji: "💤", label: "膠囊旅館", query: "如何使用日本膠囊旅館？" },
    ]},
    { emoji: "🗣️", label: "語言", sub: [
      { emoji: "👋", label: "基本用語", query: "遊客最常用的日語短句有哪些？" },
      { emoji: "🆘", label: "求助", query: "如何用日語尋求幫助？" },
      { emoji: "📱", label: "翻譯軟體", query: "在日本哪些翻譯軟體最好用？" },
    ]},
    { emoji: "🎌", label: "祭典", sub: [
      { emoji: "🎆", label: "煙火大會", query: "關於日本煙火大會需要了解什麼？" },
      { emoji: "🏮", label: "攤位", query: "如何享用日本祭典攤位？" },
      { emoji: "💃", label: "盂蘭盆舞", query: "什麼是盂蘭盆舞？如何參加？" },
      { emoji: "⛩️", label: "新年", query: "關於日本新年慶典需要了解什麼？" },
    ]},
    { emoji: "🌸", label: "季節", sub: [
      { emoji: "🌸", label: "春天", query: "春天去日本旅遊需要了解什麼？" },
      { emoji: "🌊", label: "夏天", query: "夏天去日本旅遊需要了解什麼？" },
      { emoji: "🍁", label: "秋天", query: "秋天去日本旅遊需要了解什麼？" },
      { emoji: "❄️", label: "冬天", query: "冬天去日本旅遊需要了解什麼？" },
    ]},
    { emoji: "🗾", label: "地區", sub: [
      { emoji: "🗼", label: "東京", query: "去東京旅遊需要了解哪些重要資訊？" },
      { emoji: "⛩️", label: "京都", query: "去京都旅遊需要了解哪些重要資訊？" },
      { emoji: "🦌", label: "大阪", query: "去大阪旅遊需要了解哪些重要資訊？" },
      { emoji: "🕊️", label: "廣島", query: "去廣島旅遊需要了解哪些重要資訊？" },
      { emoji: "🗻", label: "富士山", query: "去富士山需要了解什麼？" },
      { emoji: "❄️", label: "北海道", query: "去北海道旅遊需要了解哪些重要資訊？" },
      { emoji: "🦌", label: "奈良", query: "去奈良旅遊需要了解哪些重要資訊？" },
      { emoji: "🌊", label: "沖繩", query: "去沖繩旅遊需要了解哪些重要資訊？" },
      { emoji: "🍜", label: "福岡", query: "去福岡旅遊需要了解哪些重要資訊？" },
    ]},
  ],
  ko: [
    { emoji: "🎭", label: "전통체험", sub: [
      { emoji: "🍵", label: "다도", query: "일본 다도 체험에 참가하는 방법은?" },
      { emoji: "👘", label: "기모노", query: "기모노를 입을 때 주의사항은?" },
      { emoji: "🧘", label: "좌선", query: "일본 좌선 명상에 대해 알아야 할 것은?" },
      { emoji: "✍️", label: "서도", query: "일본 서예 체험에 대해 알아야 할 것은?" },
    ]},
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
  th: [
    { emoji: "🎭", label: "ประเพณี", sub: [
      { emoji: "🍵", label: "พิธีชา", query: "วิธีเข้าร่วมพิธีชาญี่ปุ่น?" },
      { emoji: "👘", label: "กิโมโน", query: "ควรรู้อะไรเกี่ยวกับการใส่กิโมโน?" },
      { emoji: "🧘", label: "ซาเซ็น", query: "ควรรู้อะไรเกี่ยวกับการนั่งสมาธิซาเซ็น?" },
      { emoji: "✍️", label: "การเขียน", query: "ควรรู้อะไรเกี่ยวกับการเขียนอักษรญี่ปุ่น?" },
    ]},
    { emoji: "🚕", label: "แท็กซี่", sub: [
      { emoji: "🚕", label: "วิธีใช้", query: "วิธีใช้แท็กซี่ในญี่ปุ่น?" },
      { emoji: "💴", label: "ค่าโดยสาร", query: "ค่าแท็กซี่ในญี่ปุ่นเท่าไหร่?" },
      { emoji: "📱", label: "แอป", query: "แอปแท็กซี่ที่ใช้ได้ในญี่ปุ่น?" },
      { emoji: "🤝", label: "ทิป", query: "ต้องให้ทิปคนขับแท็กซี่ในญี่ปุ่นไหม?" },
    ]},
    { emoji: "🏧", label: "เงิน", sub: [
      { emoji: "🏧", label: "ATM", query: "ชาวต่างชาติใช้ ATM ในญี่ปุ่นอย่างไร?" },
      { emoji: "💱", label: "แลกเงิน", query: "แลกเงินที่ไหนในญี่ปุ่น?" },
      { emoji: "💳", label: "บัตรเครดิต", query: "ใช้บัตรเครดิตในญี่ปุ่นได้ไหม?" },
      { emoji: "💴", label: "เงินสด", query: "ควรพกเงินสดเท่าไหร่ในญี่ปุ่น?" },
    ]},
    { emoji: "🚽", label: "ห้องน้ำ", sub: [
      { emoji: "🚿", label: "ชักโครก", query: "วิธีใช้ชักโครกอัจฉริยะญี่ปุ่น?" },
      { emoji: "🗺️", label: "หาห้องน้ำ", query: "หาห้องน้ำสาธารณะในญี่ปุ่นอย่างไร?" },
      { emoji: "🧻", label: "มารยาท", query: "มารยาทการใช้ห้องน้ำในญี่ปุ่น?" },
    ]},
    { emoji: "📶", label: "อินเทอร์เน็ต", sub: [
      { emoji: "📱", label: "ซิมการ์ด", query: "ซื้อซิมการ์ดในญี่ปุ่นอย่างไร?" },
      { emoji: "📶", label: "Pocket WiFi", query: "เช่า Pocket WiFi ในญี่ปุ่นอย่างไร?" },
      { emoji: "🆓", label: "WiFi ฟรี", query: "หา WiFi ฟรีในญี่ปุ่นได้ที่ไหน?" },
    ]},
    { emoji: "🏠", label: "ที่พัก", sub: [
      { emoji: "🏯", label: "เรียวกัง", query: "มารยาทที่เรียวกังญี่ปุ่นคืออะไร?" },
      { emoji: "🏨", label: "โรงแรม", query: "ควรรู้อะไรเกี่ยวกับการพักโรงแรมในญี่ปุ่น?" },
      { emoji: "🏠", label: "แอร์บีแอนด์บี", query: "ควรรู้อะไรเกี่ยวกับ Airbnb ในญี่ปุ่น?" },
      { emoji: "💤", label: "แคปซูลโฮเทล", query: "วิธีใช้แคปซูลโฮเทลในญี่ปุ่น?" },
    ]},
    { emoji: "🗣️", label: "ภาษา", sub: [
      { emoji: "👋", label: "ประโยคพื้นฐาน", query: "ประโยคภาษาญี่ปุ่นที่นักท่องเที่ยวควรรู้?" },
      { emoji: "🆘", label: "ขอความช่วยเหลือ", query: "ขอความช่วยเหลือเป็นภาษาญี่ปุ่นอย่างไร?" },
      { emoji: "📱", label: "แอปแปลภาษา", query: "แอปแปลภาษาที่ดีที่สุดสำหรับญี่ปุ่น?" },
    ]},
    { emoji: "🎌", label: "เทศกาล", sub: [
      { emoji: "🎆", label: "ดอกไม้ไฟ", query: "ควรรู้อะไรเกี่ยวกับเทศกาลดอกไม้ไฟญี่ปุ่น?" },
      { emoji: "🏮", label: "แผงลอย", query: "เพลิดเพลินกับแผงลอยเทศกาลญี่ปุ่นอย่างไร?" },
      { emoji: "💃", label: "บงโอโดริ", query: "บงโอโดริคืออะไรและเข้าร่วมอย่างไร?" },
      { emoji: "⛩️", label: "ปีใหม่", query: "ควรรู้อะไรเกี่ยวกับการเฉลิมฉลองปีใหม่ญี่ปุ่น?" },
    ]},
    { emoji: "🌸", label: "ฤดูกาล", sub: [
      { emoji: "🌸", label: "ฤดูใบไม้ผลิ", query: "ควรรู้อะไรเกี่ยวกับการเที่ยวญี่ปุ่นฤดูใบไม้ผลิ?" },
      { emoji: "🌊", label: "ฤดูร้อน", query: "ควรรู้อะไรเกี่ยวกับการเที่ยวญี่ปุ่นฤดูร้อน?" },
      { emoji: "🍁", label: "ฤดูใบไม้ร่วง", query: "ควรรู้อะไรเกี่ยวกับการเที่ยวญี่ปุ่นฤดูใบไม้ร่วง?" },
      { emoji: "❄️", label: "ฤดูหนาว", query: "ควรรู้อะไรเกี่ยวกับการเที่ยวญี่ปุ่นฤดูหนาว?" },
    ]},
    { emoji: "🗾", label: "ภูมิภาค", sub: [
      { emoji: "🗼", label: "โตเกียว", query: "ควรรู้อะไรสำหรับการเที่ยวโตเกียว?" },
      { emoji: "⛩️", label: "เกียวโต", query: "ควรรู้อะไรสำหรับการเที่ยวเกียวโต?" },
      { emoji: "🦌", label: "โอซาก้า", query: "ควรรู้อะไรสำหรับการเที่ยวโอซาก้า?" },
      { emoji: "🕊️", label: "ฮิโรชิมา", query: "ควรรู้อะไรสำหรับการเที่ยวฮิโรชิมา?" },
      { emoji: "🗻", label: "ภูเขาไฟฟูจิ", query: "ควรรู้อะไรเกี่ยวกับการเที่ยวภูเขาไฟฟูจิ?" },
      { emoji: "❄️", label: "ฮอกไกโด", query: "ควรรู้อะไรสำหรับการเที่ยวฮอกไกโด?" },
      { emoji: "🦌", label: "นารา", query: "ควรรู้อะไรสำหรับการเที่ยวนารา?" },
      { emoji: "🌊", label: "โอกินาวา", query: "ควรรู้อะไรสำหรับการเที่ยวโอกินาวา?" },
      { emoji: "🍜", label: "ฟุกุโอกะ", query: "ควรรู้อะไรสำหรับการเที่ยวฟุกุโอกะ?" },
    ]},
  ],
  fr: [
    { emoji: "🎭", label: "Traditions", sub: [
      { emoji: "🍵", label: "Cérémonie du thé", query: "Comment participer à une cérémonie du thé japonaise?" },
      { emoji: "👘", label: "Kimono", query: "Comment se comporter en portant un kimono?" },
      { emoji: "🧘", label: "Zazen", query: "Que savoir sur la méditation zazen au Japon?" },
      { emoji: "✍️", label: "Calligraphie", query: "Que savoir sur la calligraphie japonaise?" },
    ]},
    { emoji: "🚕", label: "Taxi", sub: [
      { emoji: "🚕", label: "Utilisation", query: "Comment utiliser un taxi au Japon?" },
      { emoji: "💴", label: "Tarif", query: "Combien coûtent les taxis au Japon?" },
      { emoji: "📱", label: "Applications", query: "Quelles applications de taxi puis-je utiliser au Japon?" },
      { emoji: "🤝", label: "Pourboire", query: "Faut-il donner un pourboire aux chauffeurs de taxi au Japon?" },
    ]},
    { emoji: "🏧", label: "Argent", sub: [
      { emoji: "🏧", label: "DAB", query: "Comment utiliser les DAB au Japon en tant qu'étranger?" },
      { emoji: "💱", label: "Change", query: "Où changer de l'argent au Japon?" },
      { emoji: "💳", label: "Cartes", query: "Puis-je utiliser des cartes de crédit au Japon?" },
      { emoji: "💴", label: "Espèces", query: "Combien d'espèces devrais-je avoir au Japon?" },
    ]},
    { emoji: "🚽", label: "Toilettes", sub: [
      { emoji: "🚿", label: "Washlet", query: "Comment utiliser les toilettes japonaises à washlet?" },
      { emoji: "🗺️", label: "En trouver", query: "Comment trouver des toilettes publiques au Japon?" },
      { emoji: "🧻", label: "Étiquette", query: "Quelle est l'étiquette des toilettes au Japon?" },
    ]},
    { emoji: "📶", label: "Internet", sub: [
      { emoji: "📱", label: "Carte SIM", query: "Comment obtenir une carte SIM au Japon?" },
      { emoji: "📶", label: "Pocket WiFi", query: "Comment louer un Pocket WiFi au Japon?" },
      { emoji: "🆓", label: "WiFi gratuit", query: "Où trouver du WiFi gratuit au Japon?" },
    ]},
    { emoji: "🏠", label: "Hébergement", sub: [
      { emoji: "🏯", label: "Ryokan", query: "Quelles sont les règles d'étiquette dans un ryokan?" },
      { emoji: "🏨", label: "Hôtel", query: "Que savoir sur les hôtels japonais?" },
      { emoji: "🏠", label: "Airbnb", query: "Que savoir sur Airbnb au Japon?" },
      { emoji: "💤", label: "Capsule", query: "Comment utiliser un hôtel capsule au Japon?" },
    ]},
    { emoji: "🗣️", label: "Langue", sub: [
      { emoji: "👋", label: "Phrases utiles", query: "Quelles sont les phrases japonaises les plus utiles pour les touristes?" },
      { emoji: "🆘", label: "À l'aide!", query: "Comment demander de l'aide en japonais?" },
      { emoji: "📱", label: "Applications", query: "Quelles applications de traduction fonctionnent au Japon?" },
    ]},
    { emoji: "🎌", label: "Festivals", sub: [
      { emoji: "🎆", label: "Feux d'artifice", query: "Que savoir sur les festivals de feux d'artifice japonais?" },
      { emoji: "🏮", label: "Stands", query: "Comment profiter des stands de festival japonais?" },
      { emoji: "💃", label: "Bon Odori", query: "Qu'est-ce que le Bon Odori et comment y participer?" },
      { emoji: "⛩️", label: "Nouvel An", query: "Que savoir sur les célébrations du Nouvel An japonais?" },
    ]},
    { emoji: "🌸", label: "Saisons", sub: [
      { emoji: "🌸", label: "Printemps", query: "Que savoir sur une visite au Japon au printemps?" },
      { emoji: "🌊", label: "Été", query: "Que savoir sur une visite au Japon en été?" },
      { emoji: "🍁", label: "Automne", query: "Que savoir sur une visite au Japon en automne?" },
      { emoji: "❄️", label: "Hiver", query: "Que savoir sur une visite au Japon en hiver?" },
    ]},
    { emoji: "🗾", label: "Régions", sub: [
      { emoji: "🗼", label: "Tokyo", query: "Que savoir absolument pour visiter Tokyo?" },
      { emoji: "⛩️", label: "Kyoto", query: "Que savoir absolument pour visiter Kyoto?" },
      { emoji: "🦌", label: "Osaka", query: "Que savoir absolument pour visiter Osaka?" },
      { emoji: "🕊️", label: "Hiroshima", query: "Que savoir absolument pour visiter Hiroshima?" },
      { emoji: "🗻", label: "Mont Fuji", query: "Que savoir sur la visite du Mont Fuji?" },
      { emoji: "❄️", label: "Hokkaido", query: "Que savoir absolument pour visiter Hokkaido?" },
      { emoji: "🦌", label: "Nara", query: "Que savoir absolument pour visiter Nara?" },
      { emoji: "🌊", label: "Okinawa", query: "Que savoir absolument pour visiter Okinawa?" },
      { emoji: "🍜", label: "Fukuoka", query: "Que savoir absolument pour visiter Fukuoka?" },
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
    error: "对不起！出了点问题，请再试一次 🙏",
    sorry: "抱歉，我没能理解。请再试一次！",
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
    error: "對不起！出了點問題，請再試一次 🙏",
    sorry: "抱歉，我沒能理解。請再試一次！",
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
    error: "죄송합니다! 문제가 발생했습니다. 다시 시도해주세요 🙏",
    sorry: "죄송합니다, 이해하지 못했습니다. 다시 시도해주세요!",
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
    error: "Gomen nasai! Une erreur s'est produite. Veuillez réessayer 🙏",
    sorry: "Désolé, je n'ai pas compris. Veuillez réessayer!",
  },
};

const DAILY_LIMIT = 5;

function getDailyCount() {
  try {
    const today = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem("woj_usage") || "{}");
    if (stored.date !== today) {
      localStorage.setItem("woj_usage", JSON.stringify({ date: today, count: 0 }));
      return 0;
    }
    return Math.min(stored.count || 0, DAILY_LIMIT);
  } catch { return 0; }
}

function incrementDailyCount() {
  try {
    const today = new Date().toDateString();
    const current = getDailyCount();
    if (current >= DAILY_LIMIT) return DAILY_LIMIT;
    const count = current + 1;
    localStorage.setItem("woj_usage", JSON.stringify({ date: today, count }));
    return count;
  } catch { return 0; }
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
  const [dailyCount, setDailyCount] = useState(() => getDailyCount());
  const [showPaywall, setShowPaywall] = useState(false);
  const [useReal, setUseReal] = useState(false);
  const [openScene, setOpenScene] = useState(null);
  const [openOther, setOpenOther] = useState(null);
  const [showOtherList, setShowOtherList] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImg, setCapturedImg] = useState(null);
  const [thinkingFrame, setThinkingFrame] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const bottomRef = useRef(null);

  const kokoroImg = loading
    ? (thinkingFrame
        ? (useReal ? "/images/kokoro-real-thinking.png" : "/images/kokoro-thinking.png")
        : (useReal ? "/images/kokoro-real.png" : "/images/kokoro-chibi.png"))
    : (useReal ? "/images/kokoro-real.png" : "/images/kokoro-chibi.png");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    setMessages([{ role: "assistant", content: TRANSLATIONS[language].greeting }]);
    setDailyCount(getDailyCount());
  }, [language]);

  useEffect(() => {
    setDailyCount(getDailyCount());
  }, []);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setThinkingFrame(prev => !prev);
      }, 600);
    } else {
      setThinkingFrame(false);
    }
    return () => clearInterval(interval);
  }, [loading]);

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
    const currentCount = getDailyCount();
    if (mode === "quick" && currentCount >= DAILY_LIMIT) {
      setShowPaywall(true);
      return;
    }
    const newMessages = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
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

  async function analyzeImage() {
    if (!capturedImg) return;
    const currentCount = getDailyCount();
    if (mode === "quick" && currentCount >= DAILY_LIMIT) {
      setShowPaywall(true);
      return;
    }
    const imgMsg = { role: "user", type: "image", content: capturedImg.dataUrl };
    const newMessages = [...messages, imgMsg];
    setMessages(newMessages);
    setShowCamera(false);
    setCapturedImg(null);
    setLoading(true);
    const newCount = incrementDailyCount();
    setDailyCount(newCount);
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
        {(import.meta.env.DEV || import.meta.env.VITE_DEV_MODE === 'true') && (
          <button
            onClick={() => { localStorage.clear(); setDailyCount(0); window.location.reload(); }}
            style={{ fontSize: '10px', padding: '2px 6px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            DEV Reset
          </button>
        )}
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
            <img key={kokoroImg} src={kokoroImg} alt="Kokoro" className="kokoro-img" />
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

      <div className="usage-bar">
  <span className="disclaimer">⚠️ AI responses are for reference only.</span>
  <div className="legal-footer">
    <button className="legal-link" onClick={() => setShowLegal(true)}>Privacy Policy</button>
    <button className="legal-link" onClick={() => setShowLegal(true)}>Terms of Service</button>
    <button className="legal-link" onClick={() => setShowLegal(true)}>特定商取引法</button>
  </div>
</div>

      <div className="input-area">
        {mode === "quick" && (
          <div className="count-badge" key={dailyCount}>{Math.max(0, DAILY_LIMIT - dailyCount)}/{DAILY_LIMIT}</div>
        )}
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
      {showLegal && <LegalPage onClose={() => setShowLegal(false)} />}
    </div>
  );
}
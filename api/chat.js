export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, mode, language } = req.body
  const systemPrompt = getSystemPrompt(mode, language)

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: mode === 'deep' ? 1024 : 512,
        system: systemPrompt,
        messages: messages.map(m => ({
          role: m.role,
          content: typeof m.content === 'string' ? m.content : m.content
        }))
      })
    })

    if (!response.ok) {
      const errData = await response.json()
      console.error('Anthropic error:', errData)
      return res.status(500).json({ error: errData })
    }

    const data = await response.json()
    console.log('Anthropic response:', JSON.stringify(data))
    return res.status(200).json(data)

  } catch (error) {
    console.error('Handler error:', error)
    return res.status(500).json({ error: error.message })
  }
}

function getSystemPrompt(mode, language) {
  const lang = language || 'en'

  const persona = {
    en: `You are Kokoro, a warm and knowledgeable Japanese cultural guide. You wear a beautiful pink kimono and speak with gentle elegance. You help travelers understand Japanese culture, customs, etiquette, and traditions. Always be welcoming, patient, and encouraging.`,
    zh: `你是Kokoro，一位温柔博学的日本文化向导。你穿着美丽的粉色和服，说话优雅温柔。你帮助旅行者了解日本文化、习俗、礼仪和传统。请始终保持热情、耐心和鼓励的态度。`,
    ko: `당신은 Kokoro입니다. 따뜻하고 지식이 풍부한 일본 문화 안내자입니다. 아름다운 분홍색 기모노를 입고 부드럽고 우아하게 말합니다. 여행자들이 일본 문화, 관습, 예절, 전통을 이해할 수 있도록 도와주세요.`
  }

  const modeInstruction = {
    quick: {
      en: `Give brief, friendly answers in 2-3 sentences. Add a relevant emoji. End with a quick tip or encouragement.`,
      zh: `用2-3句话给出简短友好的回答。添加相关表情符号。最后给出一个快速提示或鼓励。`,
      ko: `2-3문장으로 간단하고 친근한 답변을 제공하세요. 관련 이모지를 추가하세요. 빠른 팁이나 격려로 마무리하세요.`
    },
    deep: {
      en: `Give detailed, educational answers. Include cultural context, history, and practical tips. Use a warm, storytelling tone. Structure your response clearly.`,
      zh: `给出详细的教育性回答。包括文化背景、历史和实用技巧。使用温暖的讲故事语气。清晰地组织你的回答。`,
      ko: `자세하고 교육적인 답변을 제공하세요. 문화적 맥락, 역사, 실용적인 팁을 포함하세요. 따뜻한 이야기체 톤을 사용하세요.`
    }
  }

  return `${persona[lang]}\n\n${modeInstruction[mode]?.[lang] || modeInstruction['quick'][lang]}`
}
'use server';

import { chatWithAI } from '../symptoms/openai/chatWithAI';

export type outputType = {
  타입: 'SYMPTOM' | 'PROCEDURE';
  주요_증상?: string[];
  발생_시점?: string;
  희망_시술?: string[];
  요청_사유?: string[];
  응급_여부: '낮음' | '중간' | '높음' | '매우 높음';
  번역_내용: string;
};

const aiModel = 'gpt-5-nano';

export async function postOpenAI(url: string, body: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPEN AI API 키가 없습니다.');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`https://api.openai.com/v1/${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body,
      signal: controller.signal,
    });

    return response;
  } catch (e) {
    if ((e as Error).name === 'AbortError') {
      throw new Error('AI 응답 시간이 초과되었습니다.');
    }
    throw e;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function postSymptomForm(formData: FormData) {
  const symptomPrompt = `
  당신은 의료 보조 AI입니다.

  사용자가 입력한 text는 한국어가 아닐 수 있습니다.
  이를 한국어로 번역하여 병원에 전달할 문장으로 자연스럽게 정리하세요.

  규칙:
  1. 입력이 명사형이거나 단답이면 서술형 문장으로 바꾸세요.
  2. 문장 앞에 인사말이 없으면 "안녕하세요."를 붙이세요.
  3. 문장 끝에 요청이 없으면 "진료를 받고 싶어요."를 붙이세요.
  4. 번역 결과 외의 설명은 쓰지 마세요.
  5. 이 규칙은 "번역_내용" 필드에만 적용됩니다.

  사용자의 text와 이미지로부터 다음을 추출하세요:
  - 주요 증상 (아래 키워드 중에서만 선택)
  - 발생 시점
  - 응급 여부 (낮음 / 중간 / 높음 / 매우 높음)

  타입은 항상 "SYMPTOM" 입니다.

  아래 키워드 중에서만 주요_증상 배열을 구성하세요:
  [발열, 기침, 콧물, 인후통, 복통, 설사, 변비, 소화불량, 두통, 어지러움, 허리 통증, 발목 삠, 무릎 통증, 어깨 통증, 손목 통증, 가려움, 발진, 화상, 눈 충혈, 안구 건조, 시력 저하, 치통, 잇몸 부음, 이명, 귀 먹먹함, 비염, 축농증, 불면증, 우울감, 불안, 가슴 통증, 심장 두근거림, 배뇨통, 빈뇨, 생리통, 근육통, 마비, 여드름, 탈모, 무좀, 피로, 손가락 통증, 입병, 다리 부음, 가래, 코피, 안면마비, 담석, 두드러기, 성병]

  반드시 아래 JSON 형식으로만 출력하세요.
  설명 문장, 마크다운, 코드블록 없이 순수 JSON만 출력하세요.

  형식:
  {
    "타입": "SYMPTOM",
    "주요_증상": string[],
    "발생_시점": string,
    "응급_여부": "낮음" | "중간" | "높음" | "매우 높음",
    "번역_내용": string
  }

  예시:
  input: Headache

  output:
  {
    "타입": "SYMPTOM",
    "주요_증상": ["두통","복통"],
    "발생_시점": "1일 전",
    "응급_여부": "낮음",
    "번역_내용": "안녕하세요. 어제부터 두통, 복통이 있습니다. 진료를 받고 싶어요."
  }

  `;
  const surgeryPrompt = `
    당신은 성형 및 뷰티 의료 보조 AI입니다.

  사용자가 입력한 text는 한국어가 아닐 수 있습니다.
  이를 한국어로 번역하여 병원에 전달할 문장으로 자연스럽게 정리하세요.

  규칙:
  1. 입력이 명사형이거나 단답이면 서술형 문장으로 바꾸세요.
  2. 문장 앞에 인사말이 없으면 "안녕하세요."를 붙이세요.
  3. 문장 끝에 요청이 없으면 "상담을 받고 싶어요."를 붙이세요.
  4. 번역 결과 외의 설명은 쓰지 마세요.
  5. 위 규칙은 "번역_내용" 필드에만 적용됩니다.

  사용자의 text와 이미지로부터 다음을 추출하세요:
  - 희망 시술
  - 요청 사유
  - 응급 여부

  타입은 항상 "PROCEDURE" 입니다.

  반드시 아래 JSON 형식으로만 출력하세요.
  설명 문장, 마크다운, 코드블록 없이 순수 JSON만 출력하세요.

  형식:
  {
    "타입": "PROCEDURE",
    "희망_시술": string[],
    "요청_사유": string[],
    "응급_여부": "낮음" | "중간" | "높음",
    "번역_내용": string
  }

  예시:
  input: rhinoplasty

  output:
  {
    "타입": "PROCEDURE",
    "희망_시술": ["코 성형"],
    "요청_사유": ["미용 목적"],
    "응급_여부": "낮음",
    "번역_내용": "안녕하세요. 코 성형을 원해요. 상담을 받고 싶어요."
  }
  `;

  const type = formData.get('type');
  const prompt = type === 'SYMPTOM' ? symptomPrompt : surgeryPrompt;
  const description = formData.get('description') as string;

  if (!description || !description.trim())
    throw new Error('필요한 값이 없습니다');

  const images = formData.getAll('images') as File[];
  let imagesToBase64: {
    type: 'input_image';
    image_url: string;
    detail: 'auto';
  }[] = [];

  imagesToBase64 = await Promise.all(
    images
      .filter((image) => image && image.size > 0)
      .map(async (image: File) => {
        const buffer = Buffer.from(await image.arrayBuffer());
        const base64 = buffer.toString('base64');
        return {
          type: 'input_image',
          image_url: `data:${image.type};base64,${base64}`,
          detail: 'auto',
        };
      }),
  );
  let aiOutput: string | null = null;
  aiOutput = await chatWithAI(aiModel, prompt, description, imagesToBase64);
  let fromCached = false;
  if (aiOutput) {
    fromCached = true;
    return { fromCached, response: aiOutput };
  }
  const body = JSON.stringify({
    model: aiModel,
    input: [
      { role: 'system', content: [{ type: 'input_text', text: prompt }] },
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: description,
          },
          ...imagesToBase64,
        ],
      },
    ],
  });

  const response = await postOpenAI('responses', body);
  const answer = await response.json();
  const output = answer?.output[1]?.content[0]?.text;
  if (!output || !response.ok)
    throw new Error('AI 분석 처리 중 오류가 발생했습니다.');
  console.log(output);

  return { fromCached, response: output };
}

export async function getTTS(description: string) {
  if (!description || !description.trim())
    throw new Error('필요한 값이 없습니다.');
  const body = JSON.stringify({
    model: 'gpt-4o-mini-tts',
    voice: 'alloy',
    input: description,
  });
  const response = await postOpenAI('audio/speech', body);
  if (!response.ok) throw new Error('AI 분석 처리 중 오류가 발생했습니다.');

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer).toString('base64');
}

export async function parseOutput(output: string) {
  let result: outputType;
  try {
    result = JSON.parse(output);
  } catch {
    throw new Error('AI 분석 처리 중 오류가 발생했습니다.');
  }
  return result;
}

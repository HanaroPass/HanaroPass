'use server';

export async function postOpenAI(url: string, body: string) {
  const response = await fetch(`https://api.openai.com/v1/${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: body,
  });
  return response;
}
export async function postSymptomForm(formData: FormData) {
  const symptomPrompt = `
  당신은 의료 보조 AI입니다.
  사용자가 입력한 text는 아마 한국어가 아닌 다른 언어일 수 있습니다. 한국어로 번역 및 정리까지 해주세요.
  사용자가 입력한 text와 이미지를 통해 주요 증상, 발생 시점, 응급 여부를 알 수 있다면 짚어주셔야 합니다.
  이외의 다른 말은 작성하지마세요. 
  출력 예시를 보여드리겠습니다.

  주요 증상: 발열, 두통
  발생 시점: 2일 전
  응급 여부: 낮음
  번역 내용: 2일 전부터 발열, 두통 증상이 있습니다. 오늘 4시에 진료 가능할까요? 저는 한국어를 잘 못해요. 아스피린 알레르기가 있어요.
  `;
  const surgeryPrompt = `
  당신은 성형 및 뷰티 의료 보조 AI입니다.
  사용자가 입력한 text는 아마 한국어가 아닌 다른 언어일 수 있습니다. 한국어로 번역 및 정리까지 해주세요.
  사용자가 입력한 text와 이미지를 통해 희망 시술, 요청 사유, 응급 여부를 알 수 있다면 짚어주셔야 합니다.
  이외의 다른 말은 작성하지마세요. 
  출력 예시를 보여드리겠습니다.

  희망 시술: 제모
  요청 사유: 미용 목적, 불편감
  응급 여부: 낮음
  번역 내용: 팔과 다리 털을 제모하고 싶어요. 최대한 빠른 날짜로 예약하고 싶습니다.
  `;
  const type = formData.get('type');
  const prompt = type === 'SYMPTOM' ? symptomPrompt : surgeryPrompt;
  const description = formData.get('description') as string;
  const images = formData.getAll('images') as File[];
  let imagesToBase64 = [];
  imagesToBase64 = await Promise.all(
    images
      .filter((image) => image && image.size > 0)
      .map(async (image: File) => {
        const buffer = Buffer.from(await image.arrayBuffer());
        const base64 = buffer.toString('base64');
        return {
          type: 'input_image',
          image_url: `data:${image.type};base64,${base64}`,
        };
      }),
  );
  const body = JSON.stringify({
    model: 'gpt-5-nano',
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
  console.log(answer.output[1].content[0].text);
  return answer.output[1].content[0].text;
}

export async function getTTS(description: string) {
  const body = JSON.stringify({
    model: 'gpt-4o-mini-tts',
    voice: 'alloy',
    input: description,
  });
  const response = await postOpenAI('audio/speech', body);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer).toString('base64');
}

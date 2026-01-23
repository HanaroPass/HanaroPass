'use client';
import { Suspense, useEffect, useState } from 'react';
import { getTTS, type outputType, parseOutput } from '../../actions/symptoms';
import { useRouter, useSearchParams } from 'next/navigation';

function SymptomResultContent() {
  const [result, setResult] = useState<outputType>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    const data = localStorage.getItem('symptom-result');
    if (!data) return;

    parseOutput(data).then(setResult);
    localStorage.removeItem('symptom-result');
  }, []);

  const playAudio = async () => {
    const base64 = await getTTS(JSON.stringify(result?.번역_내용));
    const audio = new Audio(`data:audio/mp3;base64,${base64}`);
    audio.play();
  };

  return (
    <>
      <h1>AI가 증상을 정리했어요.</h1>
      <div>AI 요약 진단</div>
      <div>{JSON.stringify(result)}</div>
      <div>주요 증상</div>
      <div>발생 시점</div>
      <div>응급 여부</div>
      <div>AI 작성 내용</div>
      <div></div>
      <button>다시 번역하기</button>
      <div>AI 번역 내용</div>
      <div></div>
      <button className="border" onClick={playAudio}>
        AI 음성으로 듣기
      </button>
      <div>이 내용을 병원에 전달하면 더 원활한 예약이 가능해요</div>

      <div className="mt-6">
        {mode === 'recommend' ? (
          <button onClick={() => router.push('/medical/symptoms/recommend')}>
            병원 추천 보러가기
          </button>
        ) : (
          <button onClick={() => router.push('/map')}>지도로 돌아가기</button>
        )}
      </div>
    </>
  );
}

export default function SymptomResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <p className="animate-pulse text-gray-500">
              결과를 정리하고 있습니다...
            </p>
          </div>
        </div>
      }
    >
      <SymptomResultContent />
    </Suspense>
  );
}

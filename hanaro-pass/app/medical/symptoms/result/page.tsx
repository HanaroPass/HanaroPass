'use client';
import { Check, Copy, Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import ActionButton from '@/components/ui/ActionButton';
import AIResultIcon from '../../../../components/ui/AIResultIcon';
import { getTTS, type outputType, parseOutput } from '../../actions/symptoms';
import HospitalGuide from '../../components/languageRegistration/HospitalGuide';
import EmergencyBadge from '../../components/symptom/EmergencyBadge';
import Symptom from '../../components/symptom/Symptom';
import useSymptomResult from '../../hooks/useSymptomResult';

function SymptomResultContent() {
  const [writtenSymptom, setWrittenSymptom] = useState('');
  const [result, setResult] = useState<outputType>();
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  const { isLoading, handleSubmit } = useSymptomResult();

  useEffect(() => {
    const parse = async () => {
      setWrittenSymptom(localStorage.getItem('written-symptom') as string);
      const data = localStorage.getItem('symptom-result');
      if (!data) return;

      try {
        const result = await parseOutput(data);
        setResult(result);
      } catch (e) {
        console.error('증상 결과 파싱 실패', e);
      }
    };
    parse();
  }, []);

  const playAudio = async () => {
    const base64 = await getTTS(JSON.stringify(result?.번역_내용));
    const audio = new Audio(`data:audio/mp3;base64,${base64}`);
    audio.play();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result?.번역_내용 || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleResubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(e);
    setWrittenSymptom(localStorage.getItem('written-symptom') as string);
    const data = localStorage.getItem('symptom-result');
    if (data) {
      const result = await parseOutput(data);
      setResult(result);
    }
  };
  return (
    <div className="px-6">
      <div className="mt-4 flex justify-center">
        <AIResultIcon />
      </div>
      <h1 className="mt-3 text-center font-semibold text-2xl text-black-900 leading-8 tracking-tight">
        AI가 {result?.타입 === 'SYMPTOM' ? '증상' : '시술'}을 정리했어요.
      </h1>

      <div className="mt-4 h-1.5 border-gray-100 border-t" />
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="flex h-58 w-82 flex-col items-center justify-center gap-2 rounded-4xl bg-[#F9FAFB] text-center font-medium text-green-ez text-sm">
            <Loader className="mb-4 h-8 w-8 animate-spin text-green-ez" />
            <div>AI가 진단하고 있습니다.</div>
            <div>잠시만 기다려주세요.</div>
          </div>
        </div>
      ) : result?.타입 === 'SYMPTOM' ? (
        <>
          <div className="my-3 ml-2 text-black-800 text-sm">AI 요약 진단</div>
          <div className="w-full rounded-2xl bg-gray-200 p-6 text-black-800 text-sm">
            <div className="text- black-800 text-sm">주요 증상</div>

            <div className="mt-2">
              {result?.주요_증상?.map((symptom) => (
                <span key={symptom}>
                  <Symptom value={symptom} />
                </span>
              ))}
            </div>
            <div className="mt-4">발생 시점</div>
            <div className="mt-2 font-medium text-gray-900">
              {result?.발생_시점}
            </div>
            <div className="mt-4">응급 여부</div>
            <div className="mt-2">
              <EmergencyBadge value={result?.응급_여부} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="my-3 ml-2 text-black-800 text-sm">AI 요약 시술</div>
          <div className="w-full rounded-2xl bg-gray-200 p-6 text-black-800 text-sm">
            <div className="text- black-800 text-sm">희망 시술</div>

            <div className="mt-2">
              {result?.희망_시술?.map((symptom) => (
                <span key={symptom}>
                  <Symptom value={symptom} />
                </span>
              ))}
            </div>
            <div className="mt-4">요청 사유</div>
            <div className="mt-2 font-medium text-gray-900">
              {result?.요청_사유?.join(', ')}
            </div>
            <div className="mt-4">응급 여부</div>
            <div className="mt-2">
              <EmergencyBadge value={result?.응급_여부} />
            </div>
          </div>
        </>
      )}
      <div className="mt-5 h-1.5 border-gray-100 border-t" />
      <div className="mt-4 text-black-800 text-sm">AI 작성 내용</div>
      <form onSubmit={handleResubmit} className="mt-5">
        <input name="type" className="hidden" defaultValue={result?.타입} />
        <textarea
          defaultValue={writtenSymptom}
          className="black-800 mt-3 h-35 w-full resize-none rounded-2xl bg-gray-200 p-4 text-sm"
          name="description"
        />
        <ActionButton onClick={() => {}} text="다시 번역하기" invert={true} />
      </form>
      <div className="mt-7 text-black-800 text-sm">AI 번역 내용</div>
      <div className="relative mt-3 mb-7 w-full rounded-2xl bg-gray-200 p-6 text-black-800 text-sm">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 text-hana-green"
        >
          {copied ? (
            <Check className="h-4.5 w-4.5 text-green-600" />
          ) : (
            <Copy className="h-4.5 w-4.5" />
          )}{' '}
        </button>

        <div>{result?.번역_내용}</div>
      </div>
      <ActionButton onClick={playAudio} text="AI 음성으로 듣기" invert={true} />
      <div className="-mx-6 -mt-3">
        <HospitalGuide text="이 내용을 병원에 전달하면 더 원활한 예약이 가능해요" />
      </div>
      <div className="mt-6 h-1.5 border-gray-100 border-t" />
      <div className="mt-4 mb-6">
        {mode === 'recommend' ? (
          <ActionButton
            onClick={() => router.push('/medical/symptoms/recommend')}
            text="병원 추천 보러가기"
          />
        ) : (
          <ActionButton
            onClick={() => router.push('/map')}
            text="지도로 돌아가기"
          />
        )}
      </div>
    </div>
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

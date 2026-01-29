'use client';
import { Check, Copy, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ActionButton from '@/components/ui/ActionButton';
import AIResultIcon from '../../../../components/ui/AIResultIcon';
import HospitalGuide from '../../components/languageRegistration/HospitalGuide';
import AISummaryDiagnosis from '../../components/symptom/AISummaryDiagnosis';
import useSymptomResubmit from '../../hooks/useSymptomResubmit';

export default function SymptomResultContent() {
  const router = useRouter();
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const {
    isLoading,
    handleResubmit,
    playAudio,
    handleCopy,
    copied,
    result,
    writtenSymptom,
    mode,
  } = useSymptomResubmit(reloadTrigger);

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
      ) : (
        <AISummaryDiagnosis result={result} />
      )}
      <div className="mt-5 h-1.5 border-gray-100 border-t" />

      <div className="mt-4 text-black-800 text-sm">AI 작성 내용</div>
      <form
        onSubmit={async (e) => {
          await handleResubmit(e);
          setReloadTrigger((prev) => prev + 1);
        }}
        className="mt-5"
      >
        <input name="type" className="hidden" defaultValue={result?.타입} />
        <textarea
          defaultValue={writtenSymptom}
          className="black-800 mt-3 mb-3 h-33 w-full resize-none rounded-2xl bg-gray-200 p-6 text-sm"
          name="description"
        />
        <ActionButton
          onClick={() => {}}
          text={isLoading ? '번역 및 분석 중...' : '다시 번역하기'}
          disabled={isLoading}
          invert={true}
        />
      </form>

      <div className="mt-7 pr-4 text-black-800 text-sm">AI 번역 내용</div>
      <div className="relative mt-3 mb-6 w-full rounded-2xl bg-gray-200 p-6 pb-9 text-black-800 text-sm">
        <button
          onClick={handleCopy}
          className="absolute right-5 bottom-5 text-hana-green"
        >
          {copied ? (
            <Check className="h-4.5 w-4.5 text-green-600" />
          ) : (
            <Copy className="h-4.5 w-4.5 scale-x-[-1]" />
          )}
        </button>

        <div className="h-20">{result?.번역_내용}</div>
      </div>
      <ActionButton onClick={playAudio} text="AI 음성으로 듣기" invert={true} />
      <div className="-mx-6 -mt-3">
        <HospitalGuide text="이 내용을 병원에 전달하면 더 원활한 예약이 가능해요" />
      </div>
      <div className="mt-6 h-1.5 border-gray-100 border-t" />
      <div className="mt-4 mb-6">
        {mode === 'recommend' ? (
          <ActionButton
            onClick={() => {
              localStorage.removeItem('symptom-images');
              router.push('/medical/symptoms/recommend');
            }}
            text="병원 추천 보러가기"
          />
        ) : (
          <ActionButton
            onClick={() => {
              localStorage.removeItem('symptom-images');
              router.push('/map');
            }}
            text="지도로 돌아가기"
          />
        )}
      </div>
    </div>
  );
}

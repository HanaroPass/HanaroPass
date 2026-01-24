'use client';
import { Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import ActionButton from '@/components/ui/ActionButton';
import AIResultIcon from '../../../../components/ui/AIResultIcon';
import { getTTS, type outputType, parseOutput } from '../../actions/symptoms';
import HospitalGuide from '../../components/languageRegistration/HospitalGuide';
import EmergencyBadge from '../../components/symptom/EmergencyBadge';
import Symptom from '../../components/symptom/Symptom';

export default function SymptomResultPage() {
  const [writtenSymptom, setWrittenSymptom] = useState('');
  const [type, setType] = useState<'SYMPTOM' | 'PROCEDURE'>('SYMPTOM');
  const [result, setResult] = useState<outputType>();

  useEffect(() => {
    const parse = async () => {
      setWrittenSymptom(localStorage.getItem('written-symptom') as string);
      const data = localStorage.getItem('symptom-result');
      if (data) {
        const result = await parseOutput(data);
        setResult(result);
        if (result?.주요_증상 || result?.발생_시점) setType('SYMPTOM');
        else setType('PROCEDURE');
      }
    };
    parse();
  }, []);

  const playAudio = async () => {
    const base64 = await getTTS(JSON.stringify(result?.번역_내용));
    const audio = new Audio(`data:audio/mp3;base64,${base64}`);
    audio.play();
  };

  return (
    <div className="px-6">
      <div className="mt-4 flex justify-center">
        <AIResultIcon />
      </div>
      <h1 className="mt-3 text-center font-semibold text-2xl text-black-900 leading-8 tracking-tight">
        AI가 {type === 'SYMPTOM' ? '증상' : '시술'}을 정리했어요.
      </h1>
      <div className="mt-4 h-1.5 w-96 border-gray-100 border-t" />
      {type === 'SYMPTOM' ? (
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
              {result?.요청_사유}
            </div>
            <div className="mt-4">응급 여부</div>
            <div className="mt-2">
              <EmergencyBadge value={result?.응급_여부} />
            </div>
          </div>
        </>
      )}
      <div className="mt-5 h-1.5 w-96 border-gray-100 border-t" />

      <div className="mt-4 text-black-800 text-sm">AI 작성 내용</div>
      <textarea
        defaultValue={writtenSymptom}
        className="black-800 mt-3 h-35 w-full resize-none rounded-2xl bg-gray-200 p-4 text-sm"
      ></textarea>
      <ActionButton
        onClick={() => {}}
        text="다시 번역하기"
        invert={true}
        className="mt-5"
      />
      <div className="mt-7 text-black-800 text-sm">AI 번역 내용</div>
      <div className="relative mt-3 mb-7 w-full rounded-2xl bg-gray-200 p-6 text-black-800 text-sm">
        <button className="absolute top-2 right-2 text-hana-green">
          <Copy className="h-4.5 w-4.5" />
        </button>
        <div>{result?.번역_내용}</div>
      </div>
      <ActionButton onClick={playAudio} text="AI 음성으로 듣기" invert={true} />
      <div className="-mx-6 -mt-3">
        <HospitalGuide text="이 내용을 병원에 전달하면 더 원활한 예약이 가능해요" />
      </div>
      <div className="mt-6 h-1.5 w-96 border-gray-100 border-t" />
      <ActionButton
        className="mt-4"
        onClick={() => {}}
        text="병원 추천 보러가기"
      />
    </div>
  );
}

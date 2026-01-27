import type { outputType } from '../../actions/symptoms.action';
import EmergencyBadge from './EmergencyBadge';
import Symptom from './Symptom';

export default function AISummaryDiagnosis({
  result,
}: {
  result?: outputType;
}) {
  return result?.타입 === 'SYMPTOM' ? (
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
  );
}

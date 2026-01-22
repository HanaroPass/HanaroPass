'use client';
import { getTTS } from '../../actions/symptoms';

export default function symptomResultPage() {
  const playAudio = async () => {
    const base64 = await getTTS('말해봐라');
    const audio = new Audio(`data:audio/mp3;base64,${base64}`);
    audio.play();
  };
  return (
    <>
      <h1>AI가 증상을 정리했어요.</h1>
      <div>AI 요약 진단</div>
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
      <button>병원 추천 보러가기</button>
    </>
  );
}

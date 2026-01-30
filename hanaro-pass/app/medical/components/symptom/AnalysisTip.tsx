export default function AnalysisTip() {
  return (
    <div className="my-7 h-56 rounded-xl bg-green-300 p-5">
      <div className="pb-2 font-semibold text-sm text-teal-600 leading-5">
        혹시 작성이 어렵나요?
      </div>
      <div className="mb-2 h-18 w-full rounded-lg bg-white-ez pt-3 pl-3">
        <div className="justify-center pb-1.75 font-medium text-black-900 text-xs leading-4">
          TIP 01. 증상이라면
        </div>
        <div className="justify-center font-medium text-[10px] text-black-900 leading-3">
          <div>언제부터 증상이 있었는지,</div>
          <div>어느 부위가 아픈지를 중심으로 적어주세요.</div>
        </div>
      </div>
      <div className="h-18 w-full rounded-lg bg-white-ez pt-3 pl-3">
        <div className="justify-center pb-1.75 font-medium text-black-900 text-xs leading-4">
          TIP 02. 시술이라면
        </div>
        <div className="justify-center font-medium text-[10px] text-black-900 leading-3">
          <div>어떤 시술을 받고 싶은지,</div>
          <div>희망 날짜나 목적이 있다면 함께 적어주세요.</div>
        </div>
      </div>
    </div>
  );
}

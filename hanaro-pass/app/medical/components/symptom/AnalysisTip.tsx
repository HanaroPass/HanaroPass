export default function AnalysisTip() {
  return (
    <div className="my-7 h-64 rounded-xl bg-green-300 p-5">
      <div className="pt-0.5 pb-3 font-semibold text-m text-teal-600 leading-5">
        혹시 작성이 어렵나요?
      </div>
      <div className="mb-3 h-22 w-full rounded-lg bg-white-ez pt-3 pl-3">
        <div className="justify-center pt-0.5 pb-2 font-medium text-black-900 text-s leading-4">
          TIP 01. 증상이라면
        </div>
        <div className="justify-center font-medium text-black-900 text-sm leading-4.75">
          <div>언제부터 증상이 있었는지,</div>
          <div>어느 부위가 아픈지를 중심으로 적어주세요.</div>
        </div>
      </div>
      <div className="h-22 w-full rounded-lg bg-white-ez pt-3 pl-3">
        <div className="justify-center pt-0.5 pb-2 font-medium text-black-900 text-s leading-4">
          TIP 02. 시술이라면
        </div>
        <div className="justify-center font-medium text-black-900 text-sm leading-4.75">
          <div>어떤 시술을 받고 싶은지,</div>
          <div>희망 날짜나 목적이 있다면 함께 적어주세요.</div>
        </div>
      </div>
    </div>
  );
}

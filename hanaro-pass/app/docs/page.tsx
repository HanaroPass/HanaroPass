import DocsCardStack from './components/DocsCardStack';

export default function DocsPage() {
  return (
    <main className="min-h-dvh bg-linear-to-br from-(--color-green-ez) to-[#89D5D8] px-5 pt-4">
      {/* 상단 타이틀 */}
      <header className="mb-6">
        <h1 className="font-hana font-semibold text-[14px] text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          Hana EZ Document
        </h1>
      </header>
      {/* 보유 + 추가 버튼 */}
      <div className="mb-3 flex items-center justify-between text-white">
        <h2 className="font-sans font-semibold text-[16px]">보유</h2>
        <button
          type="button"
          className="rounded-3xl border border-white/70 px-3.5 py-1 font-sans font-semibold text-[14px]"
        >
          + 추가
        </button>
      </div>
      {/* 카드 아코디언 */}
      <div className="pb-10">
        <DocsCardStack />
      </div>
    </main>
  );
}

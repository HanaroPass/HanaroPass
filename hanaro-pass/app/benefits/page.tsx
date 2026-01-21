import Header from '@/components/header/Header';

function page() {
  return (
    <div className="app-layout">
      <Header title="혜택" showBack={true} />
      <main className="app-main bg-hana-gold p-80">
        "혜택 페이지 내용""혜택 페이지 내용""혜택 페이지 내용""혜택 페이지
        내용""혜택 페이지 내용"
      </main>
    </div>
  );
}

export default page;

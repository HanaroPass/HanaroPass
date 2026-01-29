import Header from '@/components/header/Header';

export default function HospitalLanguageApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell bg-white shadow-lg">
      <div className="app-layout flex h-full flex-col">
        <Header title="복주머니" leftType="back" />
        <main className="app-main flex flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

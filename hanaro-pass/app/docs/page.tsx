import DocsCard from './components/DocsCard';

export default function DocsPage() {
  return (
    <main>
      <DocsCard title="모바일 여권" color="peach" />
      <DocsCard title="모바일 외국인 신분증" color="blueSoft" />
      <DocsCard title="외국인 학생증" color="purple" />
      <DocsCard title="여권 사본" color="blueStrong" />
      <DocsCard title="여권 사진" color="gray" />
    </main>
  );
}

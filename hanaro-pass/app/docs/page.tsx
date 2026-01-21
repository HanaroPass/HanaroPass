import DocsCardClosed from './components/DocsCardClosed';
import DocsCardOpened from './components/DocsCardOpened';

export default function DocsPage() {
  return (
    <main>
      <DocsCardOpened title="모바일 외국인 신분증" color="blueSoft" />
      <DocsCardClosed title="모바일 외국인 신분증" color="blueSoft" />
      <DocsCardClosed title="모바일 외국인 신분증" color="blueStrong" />
      <DocsCardClosed title="모바일 외국인 신분증" color="gray" />
      <DocsCardClosed title="모바일 외국인 신분증" color="peach" />
      <DocsCardClosed title="모바일 외국인 신분증" color="purple" />
    </main>
  );
}

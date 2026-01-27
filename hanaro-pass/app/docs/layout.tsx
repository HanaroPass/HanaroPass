import type { PropsWithChildren } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="app-layout">
      <main className="app-main">{children}</main>
    </div>
  );
}

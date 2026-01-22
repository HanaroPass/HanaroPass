import type { PropsWithChildren } from 'react';

function layout({ children }: PropsWithChildren) {
  return (
    <div className="app-layout">
      <main className="app-main">{children}</main>
    </div>
  );
}

export default layout;

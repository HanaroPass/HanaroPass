import type { PropsWithChildren } from "react";
import Header from "@/components/header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "K-map",
  description: "하나로패스의 K-map 서비스",
};

function layout({ children }: PropsWithChildren) {
  return (
    <div className="app-layout">
      <Header title="K-map" />
      <main className="app-main">{children}</main>
    </div>
  );
}

export default layout;

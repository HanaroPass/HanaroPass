"use client";
import { useEffect } from "react";
import { init } from "@/lib/dcv";

export default function DynamsoftInitTest() {
  useEffect(() => {
    init()
      .then(() => {
        console.log("✅ Dynamsoft SDK 정상 초기화");
      })
      .catch((e) => {
        console.error("❌ Dynamsoft SDK 초기화 실패", e);
      });
  }, []);

  return <div>초기화 테스트 중 (브라우저 콘솔을 확인하세요)</div>;
}

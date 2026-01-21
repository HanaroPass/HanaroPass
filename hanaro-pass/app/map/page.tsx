"use client";

import { useEffect, useState } from "react";

import {
  Cross,
  Landmark,
  CircleDollarSign,
  Bookmark,
  Siren,
} from "lucide-react";
import { ToggleButton } from "./components/ToggleButton";
import { NaverMap } from "./components/NaverMap";
import BottomSheet from "./components/BottomSheet";

type TopType = "hospital" | "embassy" | "exchange" | null;

export default function MapPage() {
  const [topSelected, setTopSelected] = useState<TopType>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [rightSelected, setRightSelected] = useState({
    bookmark: false,
    siren: false,
  });
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gray-100">
      <div className="absolute inset-0 z-0">
        <NaverMap onMarkerClick={() => {}} />
      </div>

      <div
        className="absolute z-10 flex gap-[0.8rem]"
        style={{ top: "1.2rem", left: "1.2rem" }}
      >
        <ToggleButton
          variant="pill"
          label="병원"
          icon={<Cross className="w-4 h-4" />}
          active={topSelected === "hospital"}
          iconColorVariant="red"
          onClick={() =>
            setTopSelected((p) => (p === "hospital" ? null : "hospital"))
          }
        />

        <ToggleButton
          variant="pill"
          label="대사관"
          icon={<Landmark className="w-4 h-4" />}
          active={topSelected === "embassy"}
          iconColorVariant="blue"
          onClick={() =>
            setTopSelected((p) => (p === "embassy" ? null : "embassy"))
          }
        />

        <ToggleButton
          variant="pill"
          label="환전소"
          icon={<CircleDollarSign className="w-4 h-4" />}
          active={topSelected === "exchange"}
          iconColorVariant="yellow"
          onClick={() =>
            setTopSelected((p) => (p === "exchange" ? null : "exchange"))
          }
        />
      </div>

      <div className="absolute right-[1.2rem] top-[15%] z-10 flex flex-col gap-[0.8rem]">
        <ToggleButton
          variant="icon"
          icon={
            <Bookmark
              className="w-5 h-5"
              fill={rightSelected.bookmark ? "currentColor" : "none"}
            />
          }
          active={rightSelected.bookmark}
          ariaLabel="결제 장소 표시 토글"
          onClick={() =>
            setRightSelected((p) => ({ ...p, bookmark: !p.bookmark }))
          }
        />

        <ToggleButton
          variant="icon"
          icon={<Siren className="w-5 h-5" />}
          active={rightSelected.siren}
          iconColorVariant="red"
          colorVariant="red"
          ariaLabel="긴급 상황 표시 토글"
          onClick={() => setRightSelected((p) => ({ ...p, siren: !p.siren }))}
        />
      </div>

      {mounted && (
        <>
          <button
              onClick={(e) => {
                e.currentTarget.blur(); 
                setOpenBottomSheet(true);
              }}
            className="
              absolute bottom-6 left-1/2 -translate-x-1/2
              z-20
              h-12 px-6
              rounded-full
              bg-green-ez text-white
              text-base font-medium
              shadow-lg
            "
          >
            병원 필터 보기
          </button>

          <BottomSheet
            open={openBottomSheet}
            onOpenChange={setOpenBottomSheet}
          />
        </>
      )}

    </main>
  );
}
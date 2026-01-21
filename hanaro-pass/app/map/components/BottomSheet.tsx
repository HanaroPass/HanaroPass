"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import FilterPanel from "./FilterPanel";
import LanguageFilterPanel from "./LanguageFilterPanel";
import DepartmentFilterPanel from "./DepartmentFilterPanel";
import { Department } from "../constants/departments";

type FilterType = "language" | "department" | null;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function BottomSheet({ open, onOpenChange }: Props) {
  const [active, setActive] = useState<FilterType>(null);

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const basePill =
    "rounded-full px-5 py-2 text-sm font-medium border transition";
  const inactivePill = "bg-white border-gray-300 text-gray-700";
  const activePill = "bg-green-ez border-green-ez text-white";

  const languageLabel = makeLabel(
    selectedLanguages,
    "소통 가능 언어"
  );

  const departmentLabel = makeLabel(
    selectedDepartments,
    "진료과목"
  );

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[55vh] flex flex-col p-0">

        <div className="bg-white px-4 pt-1">
          <div className="flex gap-2">
            <button
              className={`${basePill} ${
                active === "language" ? activePill : inactivePill
              }`}
              onClick={() =>
                setActive(p => (p === "language" ? null : "language"))
              }
            >
              {languageLabel}
            </button>

            <button
              className={`${basePill} ${
                active === "department" ? activePill : inactivePill
              }`}
              onClick={() =>
                setActive(p => (p === "department" ? null : "department"))
              }
            >
              {departmentLabel}
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-y-auto px-6 pt-3">
          {active === "language" && (
            <FilterPanel title="소통 가능 언어">
              <LanguageFilterPanel
                value={selectedLanguages}
                onChange={setSelectedLanguages}
              />
            </FilterPanel>
          )}

          {active === "department" && (
            <FilterPanel title="진료과목">
              <DepartmentFilterPanel
                value={selectedDepartments}
                onChange={setSelectedDepartments}
              />
            </FilterPanel>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[#F0F3F4] bg-white">
          <Button className="w-full h-14 rounded-xl bg-green-ez text-white">
            나에게 맞는 병원 찾기
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function makeLabel(
  selected: string[],
  defaultLabel: string
) {
  if (selected.length === 0) return defaultLabel;
  if (selected.length === 1) return selected[0];
  if (selected.length === 2) return `${selected[0]}, ${selected[1]}`;

  return `${selected[0]}, ${selected[1]} 외 ${selected.length - 2}개`;
}
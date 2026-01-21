type DescriptionSectionProps = {
  title: string;
  descriptions: string[];
};

export default function DescriptionSection({
  title,
  descriptions,
}: DescriptionSectionProps) {
  return (
    <section className="relative w-full border-border border-b bg-white px-6 py-10">
      <div className="w-full">
        <h2 className="font-sans font-semibold text-primary text-xl">
          {title}
        </h2>
      </div>

      <div className="mt-3 w-full space-y-0.2">
        {descriptions.map(
          (
            line, // index를 인자로 받지 않음
          ) => (
            <p
              key={line} // 내용이 고유하다면 이것이 가장 좋음
              className="font-sans text-black-600 text-sm leading-relaxed tracking-tight"
            >
              {line}
            </p>
          ),
        )}
      </div>
    </section>
  );
}

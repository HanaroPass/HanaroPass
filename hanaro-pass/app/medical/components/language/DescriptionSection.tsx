type DescriptionSectionProps = {
  title: string;
  descriptions: string[];
};

export default function DescriptionSection({
  title,
  descriptions,
}: DescriptionSectionProps) {
  return (
    <section className="relative w-full border-gray-300 border-b bg-white px-6 py-6">
      <div className="w-full">
        <h2 className="font-sans font-semibold text-primary text-xl">
          {title}
        </h2>
      </div>

      <div className="mt-3 w-full space-y-0.5">
        {descriptions.map((line, index) => (
          <p
            key={`${index}-${line}`}
            className="font-sans text-black-600 text-sm leading-relaxed tracking-tight"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

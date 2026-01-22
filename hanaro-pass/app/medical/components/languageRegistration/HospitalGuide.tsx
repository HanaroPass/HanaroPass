type HospitalGuideProps = {
  text: string;
};

export default function HospitalGuide({ text }: HospitalGuideProps) {
  return (
    <div className="mx-6 mt-6 rounded-lg bg-(--color-green-300) p-4">
      <p className="whitespace-pre-line font-sans text-(--color-green-dark) text-sm leading-5">
        {text}
      </p>
    </div>
  );
}

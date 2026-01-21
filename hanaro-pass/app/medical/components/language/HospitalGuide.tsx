type HospitalGuideProps = {
  text: string;
};

export default function HospitalGuide({ text }: HospitalGuideProps) {
  return (
    <div className="mx-6 mt-6 rounded-lg bg-teal-50 p-4">
      <p className="whitespace-pre-line font-sans text-sm text-teal-700 leading-5">
        {text}
      </p>
    </div>
  );
}

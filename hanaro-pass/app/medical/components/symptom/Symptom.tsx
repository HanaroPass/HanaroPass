export default function Symptom({ value }: { value: string }) {
  return (
    <div className="mx-1 inline-flex h-7 items-center rounded-full bg-white px-3 font-medium">
      <span className="text-center text-sm text-teal-700 leading-none">
        {value}
      </span>
    </div>
  );
}

import { Copy } from 'lucide-react';

function AccountSummary() {
  return (
    <div className="w-full rounded-2xl bg-[#F7FAFB] px-6 py-5">
      <div className="mb-6">
        <p className="font-semibold text-black-800 text-lg">저축예금</p>

        <div className="mt-1 flex items-center gap-2 text-black-600">
          <span className="text-sm">278-911435-68407</span>
          <Copy size={15} className="cursor-pointer" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <span className="text-black-800">KRW</span>
        <span className="font-bold text-4xl text-black-800 tracking-tight">
          500,266
        </span>
      </div>
    </div>
  );
}

export default AccountSummary;

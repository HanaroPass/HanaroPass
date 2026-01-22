import Image from 'next/image';
import Link from 'next/link';
import AccountSummary from './AccountSummary';
import MenuList from './MenuList';

function Transfer() {
  return (
    <div className="flex flex-col gap-5">
      <AccountSummary />
      <button
        type="button"
        className="flex h-13.25 items-center justify-center gap-1 rounded-xl border-2 border-black-200 font-semibold text-base text-black-800"
      >
        <Image
          src="/images/main/accounts.svg"
          width={25}
          height={18}
          alt="보유계좌조회"
        />
        보유계좌조회
      </button>
      <MenuList type="transfer" />
      <Link
        href="https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1508308_115157.jsp"
        className="block w-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="relative aspect-340/139 w-full overflow-hidden">
          <Image
            src="/images/main/ad-savings.png"
            alt="하나 EZ 적금"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>
    </div>
  );
}

export default Transfer;

import Image from 'next/image';
import Link from 'next/link';
import AccountSummary from './AccountSummary';
import MenuList from './MenuList';

function Transfer() {
  return (
    <div className="flex flex-col gap-5">
      <AccountSummary />
      <MenuList type="transfer" />
      <Link
        href="https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1508308_115157.jsp"
        className="block w-full"
        target="blank"
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

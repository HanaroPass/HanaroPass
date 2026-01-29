import Image from 'next/image';
import Link from 'next/link';

function ExchangeCard({
  code,
  value,
  delta,
}: {
  code: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="min-w-35 rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Image
          src={`/images/flags/${code}.svg`}
          alt={`${code} flag`}
          width={26}
          height={16}
        />
        <p className="font-bold text-gray-700">{code}</p>
      </div>

      <p className="mt-3 font-bold text-2xl text-black-900">{value}</p>
      <p className="mt-1 text-base text-red-500">▲ {delta}</p>
    </div>
  );
}

export default function PassportUnregisteredContent() {
  return (
    <div className="space-y-6">
      <section>
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
          <ExchangeCard code="USD" value="1,472.70" delta="2.40" />
          <ExchangeCard code="CAD" value="1,060.03" delta="1.69" />
          <ExchangeCard code="EUR" value="1,060.03" delta="1.69" />
        </div>
      </section>

      <section className="h-30 rounded-3xl bg-[#FBE7AE] p-5 pr-8">
        <p className="font-bold text-base">모바일번호표/방문예약</p>
        <Image
          src="/images/main/reservation2.svg"
          width={80}
          height={80}
          alt="모바일 번호표"
          className="-mt-8 ml-auto"
        />
      </section>

      <section className="h-30 rounded-3xl bg-[#FFD9C0] p-5 pr-8">
        <Link href={'/medical/registrations'}>
          <p className="font-bold text-base">우리 병원 진료 가능 언어 등록</p>
          <Image
            src="/images/main/medical.svg"
            width={80}
            height={80}
            alt="우리 병원 진료 가능 언어 등록하기"
            className="-mt-1 ml-auto"
          />
        </Link>
      </section>

      <section className="grid h-36.25 grid-cols-2 gap-4">
        <div className="rounded-3xl bg-[#CFE2FF] p-5">
          <p className="font-bold text-base">비대면 계좌개설</p>
          <Image
            src="/images/main/open-account.svg"
            width={64}
            height={64}
            alt="계좌개설"
            className="mt-6 ml-auto"
          />
        </div>

        <div className="rounded-3xl bg-[#C9F2DD] p-5">
          <p className="font-bold text-base">다국어 전화 안내</p>
          <Image
            src="/images/main/multilang2.svg"
            width={64}
            height={64}
            alt="다국어 안내"
            className="mt-6 ml-auto"
          />
        </div>
      </section>
    </div>
  );
}

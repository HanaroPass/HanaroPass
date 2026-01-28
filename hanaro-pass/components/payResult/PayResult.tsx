import { CircleCheck, CircleSlash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/providers/alertProvider';
import ActionButton from '../ui/ActionButton';

export default function PaymentResultModal(props: {
  variant: 'success' | 'fail';
  title: string;
  description?: string;
  amountLabel?: string;
  savedAmount?: number;
}) {
  const isSuccess = props.variant === 'success';
  const router = useRouter();
  const { close } = useAlert();

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {isSuccess ? (
        <CircleCheck size={107} strokeWidth={1} className="text-green-ez" />
      ) : (
        <CircleSlash size={107} strokeWidth={1} className="text-hana-red" />
      )}

      <div className="text-center">
        <div className="font-semibold text-black-900 text-lg">
          {props.title}
        </div>

        {props.amountLabel ? (
          <div className="mt-2 inline-flex rounded-lg bg-gray-100 px-3 py-1 font-semibold text-sm">
            {props.amountLabel}
          </div>
        ) : null}

        {props.description ? (
          <div className="mt-2 text-gray-500 text-sm">{props.description}</div>
        ) : null}

        {isSuccess && (props.savedAmount ?? 0) > 0 ? (
          <div className="mt-3 font-medium text-sm text-teal-600">
            쿠폰 사용으로 {props.savedAmount!.toLocaleString()}원을 절약했어요!
          </div>
        ) : null}
      </div>

      <ActionButton
        text="확인"
        onClick={() => {
          close();
          router.push('/');
        }}
        className="w-full rounded-xl"
      />
    </div>
  );
}

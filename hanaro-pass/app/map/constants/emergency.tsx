import { IdCard, Landmark, MapPinned } from 'lucide-react';

export const steps = [
  {
    id: 'step1',
    step: 'STEP 1',
    description:
      '가까운 경찰서 또는 분실 신고센터에 방문해 여권 분실 신고를 하세요.여권을 잃어버린 장소와 시간을 최대한 자세히 설명하세요.',
    icon: <MapPinned />,
    iconColor: 'text-hana-red',
  },
  {
    id: 'step2',
    step: 'STEP 2',
    description:
      '자국 대사관 또는 영사관에 연락해 여권 분실 사실을 알리세요. 분실 신고 확인서가 필요할 수 있어요.',
    icon: <Landmark />,
    iconColor: 'text-blue-100',
  },
  {
    id: 'step3',
    step: 'STEP 3',
    description:
      '임시 여권 또는 여행증명서를 발급받아 출국 준비를 하세요. 발급에는 수수료와 시간이 걸릴 수 있어요.',
    icon: <IdCard />,
    iconColor: 'text-black-800',
  },
];

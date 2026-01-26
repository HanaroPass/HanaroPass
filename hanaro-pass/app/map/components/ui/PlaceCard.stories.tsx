import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type LocationInfo, PlaceCard } from './PlaceCard';

const mockData: LocationInfo = {
  id: 1,
  name: '하나은행 환전소',
  type: '환전소',
  status: '영업중',
  explainTime: '09:00 - 18:00',
  distance: '120m',
  address: '서울특별시 중구 을지로 66',
  phone: '02-0123-4567',
  imageUrl: '/images/map/img_map_emergency.png',
};

const meta = {
  title: 'Map/PlaceCard',
  component: PlaceCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Map 화면 하단에 표시되는 장소 정보 카드 컴포넌트입니다.

선택된 장소의 **이름, 유형, 영업 정보, 거리, 주소**를 표시하며  
전화 걸기 / 네이버 지도 연결 액션을 제공합니다.

## Usage
- 지도 마커 선택 시 상세 정보 표시
- 환전소, 병원, 편의시설 등 POI(Point of Interest) 정보 표현
        `,
      },
    },
  },
  argTypes: {
    data: {
      description: '표시할 장소 정보 객체입니다.',
      table: {
        type: { summary: 'LocationInfo' },
      },
    },
  },
} satisfies Meta<typeof PlaceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const WithoutImage: Story = {
  args: {
    data: {
      ...mockData,
      imageUrl: undefined,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '이미지가 없는 장소 정보 카드 예시입니다.',
      },
    },
  },
};

export const MinimalInfo: Story = {
  args: {
    data: {
      name: '알파코',
      type: '학원',
      explainTime: '09:00 - 21:00',
      address: '서울 성동구 아차산로 111 2층',
      phone: '02-0000-1234',
    },
  },
  parameters: {
    docs: {
      description: {
        story: '필수 정보만 있는 최소 형태의 카드 예시입니다.',
      },
    },
  },
};

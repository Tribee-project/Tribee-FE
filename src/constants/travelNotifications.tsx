import type { NotificationConfig } from '@/types';

export const TRAVEL_NOTIFICATIONS: Record<string, NotificationConfig> = {
  DOMESTIC: {
    message: '국내 여행 안내사항',
    description: (
      <ul className="list-disc">
        <li>국내 여행 시 대중교통 이용이 편리하니 교통카드를 준비하세요.</li>
        <li>계절별 날씨 변화가 크니 여행 지역의 날씨를 미리 확인하세요.</li>
        <li>지역 특산품과 맛집 정보를 미리 알아보고 방문하세요.</li>
      </ul>
    ),
    placement: 'top',
    style: {
      width: 650,
    },
  },
  JEJU: {
    message: '제주도 여행 안내사항',
    description: (
      <ul className="list-disc">
        <li>제주도 여행 시 날씨 변화가 심하니 우산과 바람막이를 준비하세요.</li>
        <li>
          렌터카 이용 시 도로가 좁으니 주의 운전하시고, 현지 맛집은 미리
          예약하는 것을 추천합니다.
        </li>
        <li>햇빛이 강하니 자외선 차단제를 준비하세요.</li>
      </ul>
    ),
    placement: 'top',
    style: {
      width: 650,
    },
  },
  ASIA: {
    message: '동남아시아 여행 안내사항',
    description: (
      <ul className="list-disc">
        <li>동남아시아는 우기와 건기가 있으니 여행 시기를 잘 선택하세요.</li>
        <li>모기가 많으니 방충제를 준비하고, 열대병 예방접종을 고려하세요.</li>
        <li>길거리 음식 섭취 시 주의하고, 생수를 마시는 것을 권장합니다.</li>
      </ul>
    ),
    placement: 'top',
    style: {
      width: 650,
    },
  },
  EUROPE: {
    message: '유럽 여행 안내사항',
    description: (
      <ul className="list-disc">
        <li>유럽 여행 시 솅겐 비자가 필요할 수 있으니 미리 확인하세요.</li>
        <li>소매치기가 많으니 귀중품 관리에 주의하고, 가방은 앞으로 메세요.</li>
        <li>대부분 카드 결제가 가능하지만 소액 팁용 현금을 준비하세요.</li>
      </ul>
    ),
    placement: 'top',
    style: {
      width: 650,
    },
  },
  JAPAN: {
    message: '일본 여행 안내사항',
    description: (
      <ul className="list-disc">
        <li>
          일본은 현금 사회이므로 충분한 엔화를 준비하시고, IC카드를 미리
          구매하세요.
        </li>
        <li>
          온천 이용 시 문신이 있으면 입장이 제한될 수 있으니 미리 확인하세요.
        </li>
        <li>
          지진이 빈번하니 안전 수칙을 숙지하고, 휴대폰 재난 알림을 설정하세요.
        </li>
      </ul>
    ),
    placement: 'top',
    style: {
      width: 650,
    },
  },
  CHINA: {
    message: '중국 여행 안내사항',
    description: (
      <ul className="list-disc">
        <li>
          중국 입국 시 비자가 필요하며, 여권 유효기간을 6개월 이상 확인하세요.
        </li>
        <li>구글, 페이스북 등 일부 사이트가 차단되니 VPN을 준비하세요.</li>
        <li>
          대기오염이 심할 수 있으니 마스크를 준비하고, 물은 생수를 드세요.
        </li>
      </ul>
    ),
    placement: 'top',
    style: {
      width: 650,
    },
  },
  AMERICAS: {
    message: '괌/사이판 여행 안내사항',
    description: (
      <ul className="list-disc">
        <li>
          괌/사이판은 한국인 무비자 입국이 가능하며, 여권 유효기간 6개월 이상
          필요합니다.
        </li>
        <li>자외선이 매우 강하니 선크림과 선글라스를 필수로 준비하세요.</li>
        <li>팁 문화가 있으니 레스토랑과 호텔에서 10-15% 팁을 준비하세요.</li>
      </ul>
    ),
    placement: 'top',
    style: {
      width: 650,
    },
  },
  AUSTRALIA: {
    message: '호주 여행 안내사항',
    description: (
      <ul className="list-disc">
        <li>호주는 계절이 반대이므로 여행 시기에 맞는 옷을 준비하세요.</li>
        <li>자외선이 매우 강하니 선크림과 모자를 필수로 준비하세요.</li>
        <li>팁 문화가 없으며, 대부분 카드 결제가 가능합니다.</li>
      </ul>
    ),
    placement: 'top',
    style: {
      width: 650,
    },
  },
  US: {
    message: '미국 여행 안내사항',
    description: (
      <ul className="list-disc">
        <li>
          미국 입국 시 ESTA 또는 비자가 필요하며, 여권 유효기간을 확인하세요.
        </li>
        <li>
          팁 문화가 발달되어 있으니 레스토랑, 택시 등에서 15-20% 팁을
          준비하세요.
        </li>
        <li>의료비가 비싸니 여행자 보험 가입을 권장합니다.</li>
      </ul>
    ),
    placement: 'top',
    style: {
      width: 650,
    },
  },
  HONEYMOON: {
    message: '허니문 여행 안내사항',
    description: (
      <ul className="list-disc">
        <li>
          허니문 여행은 미리 예약하여 특별한 서비스를 받을 수 있도록 하세요.
        </li>
        <li>로맨틱한 레스토랑과 스파는 사전 예약이 필수입니다.</li>
        <li>여권과 비자, 그리고 결혼증명서를 준비하세요.</li>
      </ul>
    ),
    placement: 'top',
    style: {
      width: 650,
    },
  },
  WORKSHOP: {
    message: '워크샵 여행 안내사항',
    description: (
      <ul className="list-disc">
        <li>워크샵 여행은 체험 활동이 많으니 편한 복장을 준비하세요.</li>
        <li>전문 강사의 지도를 받으며 새로운 기술을 배울 수 있습니다.</li>
        <li>재료비나 도구 대여비가 별도로 발생할 수 있으니 확인하세요.</li>
      </ul>
    ),
    placement: 'top',
    style: {
      width: 650,
    },
  },
};

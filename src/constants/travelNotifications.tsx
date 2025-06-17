import type { NotificationConfig } from '@/types';

export const TRAVEL_NOTIFICATIONS: Record<string, NotificationConfig> = {
  DOMESTIC: {
    message: '국내 여행 안내사항',
    description: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
        <li>
          🚌 <strong>대중교통 이용</strong>: 교통카드나 모바일 체크카드를
          준비하면 시내·지방 이동이 훨씬 편리해요.
        </li>
        <li>
          🌤️ <strong>날씨 변화</strong>: 아침저녁과 낮의 기온 차가 클 수 있으니
          얇은 겉옷을 챙기세요.
        </li>
        <li>
          🍲 <strong>지역 특산물 & 맛집</strong>: 미리 리뷰와 메뉴를 확인해서
          숨은 맛집을 발견해보세요.
        </li>
        <li>
          🏨 <strong>숙소 체크인</strong>: 체크인 시 늦어지면 미리 연락하고,
          조식·주차 여부도 확인하세요.
        </li>
        <li>
          🛡️ <strong>안전 수칙</strong>: 산·바다·축제 등 장소별 주의사항을
          확인하고, 응급 상황 대비 방법을 알아두세요.
        </li>
      </ul>
    ),
    placement: 'top',
    style: { width: 700 },
  },
  JEJU: {
    message: '제주도 여행 안내사항',
    description: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
        <li>
          🌦️ <strong>날씨 변화</strong>: 하루에도 날씨가 자주 바뀌니{' '}
          <em>우산이나 바람막이</em>를 꼭 챙기세요.
        </li>
        <li>
          ☀️ <strong>강한 자외선</strong>: 햇볕이 매우 강하니{' '}
          <em>선크림, 선글라스, 모자</em>는 필수입니다.
        </li>
        <li>
          🚗 <strong>렌터카 운전</strong>: 좁고 굽은 도로가 많아{' '}
          <em>안전 운전</em>이 필요해요. 내비게이션은 최신으로 업데이트!
        </li>
        <li>
          🚌 <strong>대중교통</strong>: 버스 배차 간격이 길 수 있어요.{' '}
          <em>일정은 여유 있게</em> 계획하세요.
        </li>
        <li>
          🍴 <strong>현지 맛집</strong>: 인기 맛집은 <em>미리 예약</em>하지
          않으면 대기 시간이 길 수 있어요!
        </li>
        <li>
          🏞️ <strong>자연 보호</strong>: 오름, 해변 등에서는{' '}
          <em>쓰레기 되가져가기</em> 실천 부탁드려요 ♻️
        </li>
        <li>
          📵 <strong>출입 제한 구역</strong>: 사진 찍기 좋은 곳이라도{' '}
          <em>사유지·출입금지 구역은 지양</em>해 주세요.
        </li>
        <li>
          📞 <strong>응급 연락처</strong>: 119(응급), 112(경찰),{' '}
          <em>제주 관광안내센터</em> 064-740-6000
        </li>
      </ul>
    ),
    placement: 'top',
    style: { width: 700 },
  },
  ASIA: {
    message: '동남아시아 여행 안내사항',
    description: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
        <li>
          🌧️ <strong>우기·건기 구분</strong>: 일정에 따라 우기 피해 여행하는
          것이 좋아요.
        </li>
        <li>
          🦟 <strong>모기·열대병</strong>: 긴 소매·긴 바지, 방충제 꼭 챙기고
          예방접종도 고려하세요.
        </li>
        <li>
          🥤 <strong>물과 음식</strong>: 생수만 드시고, 위생 상태를 확인한
          음식점 위주로 이용하세요.
        </li>
        <li>
          🧳 <strong>환전</strong>: 현지 통화는 소액 위주로 미리 환전해두세요.
        </li>
        <li>
          🛂 <strong>입국 조건</strong>: 일부 국가는 비자가 필요하니 미리
          확인하세요.
        </li>
      </ul>
    ),
    placement: 'top',
    style: { width: 700 },
  },
  EUROPE: {
    message: '유럽 여행 안내사항',
    description: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
        <li>
          🛂 <strong>셴겐 비자 체크</strong>: 방문 국가의 기간과 조건을 미리
          확인하세요.
        </li>
        <li>
          🎒 <strong>소매치기 주의</strong>: 사람이 많은 장소에서 귀중품은 몸
          앞쪽에 보관하세요.
        </li>
        <li>
          💶 <strong>소액 현금</strong>: 팁, 소액결제, 교통비 등을 위해 자그마한
          유로 동전이나 지폐를 준비하세요.
        </li>
        <li>
          🚆 <strong>교통패스 활용</strong>: 국가 또는 도시별 교통패스를
          구매하면 교통비 절약에 도움이 됩니다.
        </li>
      </ul>
    ),
    placement: 'top',
    style: { width: 700 },
  },
  JAPAN: {
    message: '일본 여행 안내사항',
    description: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
        <li>
          💴 <strong>현금 사회</strong>: 소액 거래를 위해 충분한 엔화를
          준비하고, <em>IC카드</em>도 구매하세요.
        </li>
        <li>
          ♨️ <strong>온천 이용</strong>: 문신이 있는 경우 입장이 제한될 수
          있으니 사전 확인하세요.
        </li>
        <li>
          🌏 <strong>지진 대비</strong>: 지진 대피 요령 숙지, 휴대폰 재난 알림
          설정을 잊지 마세요.
        </li>
        <li>
          🍱 <strong>식문화</strong>: 줄서기 문화가 있어 인기 식당은 예약하거나
          오픈 시간에 맞춰 가세요.
        </li>
      </ul>
    ),
    placement: 'top',
    style: { width: 700 },
  },
  CHINA: {
    message: '중국 여행 안내사항',
    description: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
        <li>
          🛂 <strong>비자 확인</strong>: 입국 전에 비자 발급 및 여권
          유효기간(6개월 이상)을 확인하세요.
        </li>
        <li>
          🌐 <strong>인터넷 검열</strong>: 구글, 페이스북 사용 불가,{' '}
          <em>VPN 설치</em>를 고려하세요.
        </li>
        <li>
          😷 <strong>대기 오염</strong>: 마스크와 공기질 앱을 체크하며
          외출하세요.
        </li>
        <li>
          🍜 <strong>현지 음식</strong>: 길거리 음식은 익혀 먹고, 위생 상태를
          확인하세요.
        </li>
      </ul>
    ),
    placement: 'top',
    style: { width: 700 },
  },
  AMERICAS: {
    message: '괌/사이판 여행 안내사항',
    description: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
        <li>
          🛄 <strong>입국 요건</strong>: 무비자 입국 가능, 여권 유효기간 6개월
          이상 유지하세요.
        </li>
        <li>
          ☀️ <strong>자외선</strong>: 햇볕이 강하니 선크림, 선글라스, 모자
          챙기세요.
        </li>
        <li>
          💵 <strong>팁 문화</strong>: 미국령 지역이니 식당·호텔·택시 등에서{' '}
          <em>10~15% 팁</em>을 준비하세요.
        </li>
        <li>
          🏝️ <strong>해변 안전</strong>: 파도·조류 강할 수 있으니 안내 표지판을
          잘 따르고, 구명조끼 착용을 권장해요.
        </li>
      </ul>
    ),
    placement: 'top',
    style: { width: 700 },
  },
  AUSTRALIA: {
    message: '호주 여행 안내사항',
    description: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
        <li>
          🧥 <strong>계절 반대</strong>: 한국과 계절이 반대이니 현재 호주 계절을
          확인하세요.
        </li>
        <li>
          ☀️ <strong>자외선 지수 높음</strong>: 선크림·모자 챙기고, 야외 활동은
          오전/오후 늦게 계획하세요.
        </li>
        <li>
          💳 <strong>결제 방식</strong>: 카드가 보편적이고 팁은 의무는 아니지만,
          감사 표시로 소량만 줘도 좋아요.
        </li>
        <li>
          🦎 <strong>야생동물 주의</strong>: 해변·숲 등에서 행동할 때 안전수칙을
          지키세요.
        </li>
      </ul>
    ),
    placement: 'top',
    style: { width: 700 },
  },
  US: {
    message: '미국 여행 안내사항',
    description: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
        <li>
          🛂 <strong>ESTA/비자</strong>: 사전에 꼭 신청하고, 여권 유효기간도
          확인하세요.
        </li>
        <li>
          💵 <strong>팁 문화</strong>: 레스토랑·택시·호텔 등에서{' '}
          <em>15~20% 팁</em>은 기본입니다.
        </li>
        <li>
          🩺 <strong>의료비</strong>: 외래치료도 비싸므로 <em>여행자 보험</em>은
          필수입니다.
        </li>
        <li>
          🚗 <strong>운전</strong>: 오른쪽 운전이 익숙하지 않다면, 초행길은
          조심하세요.
        </li>
      </ul>
    ),
    placement: 'top',
    style: { width: 700 },
  },
  HONEYMOON: {
    message: '허니문 여행 안내사항',
    description: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
        <li>
          💑 <strong>특별 서비스</strong>: 허니문 전용 혜택(룸 업그레이드, 웰컴
          샴페인 등)을 사전 요청하세요.
        </li>
        <li>
          ⏰ <strong>사전 예약</strong>: 로맨틱 디너, 스파, 액티비티는 미리
          예약하는 게 좋아요.
        </li>
        <li>
          📄 <strong>서류 준비</strong>: 여권, 비자, <em>결혼증명서</em>도
          준비해주세요.
        </li>
        <li>
          💸 <strong>예산 & 팁</strong>: 팁 문화 유무와 예산도 미리
          확인해두세요.
        </li>
      </ul>
    ),
    placement: 'top',
    style: { width: 700 },
  },
  WORKSHOP: {
    message: '워크샵 여행 안내사항',
    description: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
        <li>
          👕 <strong>편안한 복장</strong>: 활동이 많으니{' '}
          <em>운동화와 활동복</em>을 준비하세요.
        </li>
        <li>
          🧑‍🏫 <strong>전문가 강의</strong>: 강사의 지도를 받으며 새로운 기술이나
          체험을 배우세요.
        </li>
        <li>
          💰 <strong>추가 비용</strong>: 재료비·도구 대여비 등이 별도로 발생할
          수 있으니 미리 확인하세요.
        </li>
        <li>
          🗓️ <strong>시간 관리</strong>: 각 활동의 시간표를 미리 확인하고 여유
          있게 계획하세요.
        </li>
      </ul>
    ),
    placement: 'top',
    style: { width: 700 },
  },
};

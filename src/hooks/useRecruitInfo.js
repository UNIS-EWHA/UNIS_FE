import { useEffect, useState } from 'react';
import { getRecruitInfo } from '@/api/application';

function useRecruitInfo() {
  const [recruitInfo, setRecruitInfo] = useState(null);

  useEffect(() => {
    getRecruitInfo()
      .then((res) => setRecruitInfo(res.data))
      .catch(() => setRecruitInfo(null));
  }, []);

  const isApplyDisabled =
    recruitInfo?.status === 'CLOSED' || recruitInfo?.status === 'PREPARING';

  const applyButtonLabel =
    recruitInfo?.status === 'CLOSED'
      ? `${recruitInfo.generation}기 모집 완료`
      : recruitInfo?.status === 'PREPARING'
        ? `${recruitInfo.generation}기 모집 준비중`
        : '지원하기';

  return { recruitInfo, applyButtonLabel, isApplyDisabled };
}

export default useRecruitInfo;

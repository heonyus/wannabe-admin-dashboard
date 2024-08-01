import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RealTimeActivity from '../components/RealTimeActivity';
import ActivityGraph from '../components/ActivityGraph';
import PopularKeywords from '../components/PopularKeywords';
import ChatChatPosts from '../components/ChatChatPosts';
import UserInteractions from '../components/UserInteractions';

interface InfluencerData {
  name: string;
  // 다른 필요한 속성들을 여기에 추가하세요
}

const InfluencerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [influencerData, setInfluencerData] = useState<InfluencerData | null>(null);

  useEffect(() => {
    // 여기서 인플루언서 데이터를 가져오는 API 호출을 수행합니다.
    // 예시:
    const fetchData = async () => {
      // const data = await fetchInfluencerData(id);
      // setInfluencerData(data);
      setInfluencerData({ name: 'Sample Influencer' }); // 임시 데이터
    };
    fetchData();
  }, [id]);

  if (!influencerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="influencer-page">
      <h1>인플루언서 대시보드: {influencerData.name}</h1>
      <div className="dashboard-grid">
        <RealTimeActivity influencerId={id || ''} />
        <ActivityGraph influencerId={id || ''} />
        <PopularKeywords influencerId={id || ''} />
        <ChatChatPosts influencerId={id || ''} />
        <UserInteractions influencerId={id || ''} />
      </div>
    </div>
  );
};

export default InfluencerPage;
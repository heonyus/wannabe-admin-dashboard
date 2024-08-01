import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Thread {
  id: string;
  text: string;
  timestamp: string;
  permalink: string;
  likes: number;
  replies: number;
  views: number;
  media_url?: string;
  media_type: string;
}

interface InfluencerData {
  name: string;
  threads: Thread[];
}

const InfluencerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [influencerData, setInfluencerData] = useState<InfluencerData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://wannabe-backend.vercel.app/api/threads');
        const threads = response.data;
        setInfluencerData({
          name: '샘플 인플루언서',
          threads: threads
        });
      } catch (error) {
        console.error('인플루언서 데이터 가져오기 오류:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!influencerData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="influencer-page">
      <h1>인플루언서 대시보드: {influencerData.name}</h1>
      <div className="threads-list">
        <h2>게시물 목록</h2>
        {influencerData.threads.map((thread) => (
          <div key={thread.id} className="thread-item">
            <h3>{thread.text}</h3>
            <p>게시 시간: {new Date(thread.timestamp).toLocaleString()}</p>
            {thread.media_url && (
              <div className="thread-media">
                {thread.media_type === 'IMAGE' ? (
                  <img src={thread.media_url} alt="Thread media" />
                ) : thread.media_type === 'VIDEO' ? (
                  <video src={thread.media_url} controls />
                ) : null}
              </div>
            )}
            <p>
              <a href={thread.permalink} target="_blank" rel="noopener noreferrer">
                게시물 링크
              </a>
            </p>
            <div className="thread-stats">
              <span>좋아요: {thread.likes}</span>
              <span>댓글: {thread.replies}</span>
              <span>조회수: {thread.views}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfluencerPage;
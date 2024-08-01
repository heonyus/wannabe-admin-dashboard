import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Thread {
  id: string;
  text: string;
  timestamp: string;
  permalink: string;
  media_url?: string;
  media_type: string;
  likes: number;
  replies: number;
  views: number;
  username: string;
}

const InfluencerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://wannabe-backend.vercel.app/api/threads?instagram_id=${id}`, {
          timeout: 10000,
        });
        console.log('API 응답:', response.data);
        setThreads(response.data);
        setLoading(false);
      } catch (error) {
        console.error('스레드 데이터 가져오기 오류:', error);
        if (axios.isAxiosError(error)) {
          setError(`데이터를 불러오는 중 오류가 발생했습니다. 자세한 내용: ${error.message}`);
          if (error.response) {
            console.error('응답 데이터:', error.response.data);
            console.error('응답 상태:', error.response.status);
          }
        } else {
          setError('데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.');
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  return (
    <div className="influencer-page">
      <h1>인플루언서 대시보드</h1>
      <div className="threads-list">
        <h2>게시물 목록</h2>
        {threads.map((thread) => (
          <div key={thread.id} className="thread-item">
            <h3>{thread.text}</h3>
            <p>작성자: {thread.username}</p>
            <p>게시 시간: {new Date(thread.timestamp).toLocaleString()}</p>
            {thread.media_url && (
              <div className="thread-media">
                {thread.media_type.includes('IMAGE') ? (
                  <img src={thread.media_url} alt="Thread media" />
                ) : thread.media_type.includes('VIDEO') ? (
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
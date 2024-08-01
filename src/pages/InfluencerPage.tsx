import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TagCloud } from 'react-tagcloud';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
  const [searchTerm, setSearchTerm] = useState('');

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
          setError(error.message === 'Email rate limit exceeded' 
            ? '회원가입 요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.' 
            : error.message);
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

  const filteredThreads = threads.filter(thread => 
    thread.text && thread.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartData = {
    labels: ['좋아요', '답글', '조회수'],
    datasets: [{
      label: '최근 게시글 평균 통계',
      data: [
        threads.reduce((sum, thread) => sum + (thread.likes || 0), 0) / threads.length,
        threads.reduce((sum, thread) => sum + (thread.replies || 0), 0) / threads.length,
        threads.reduce((sum, thread) => sum + (thread.views || 0), 0) / threads.length
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  };

  const wordCloudData = threads
    .filter(thread => thread.text)
    .flatMap(thread => 
      thread.text.split(/\s+/).filter(word => word.length > 3)
    ).reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const wordCloudArray = Object.entries(wordCloudData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map(([value, count]) => ({ value, count }));

  const totalStats = {
    likes: threads.reduce((sum, thread) => sum + (thread.likes || 0), 0),
    replies: threads.reduce((sum, thread) => sum + (thread.replies || 0), 0),
    views: threads.reduce((sum, thread) => sum + (thread.views || 0), 0)
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <PageContainer>
      <Header>
        <h1>Threads User Dashboard - {id}</h1>
      </Header>

      <MainContent>
        <SearchBar
          type="text"
          placeholder="키워드 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <RealTimeActivity>실시간 활동이 여기에 표시됩니다...</RealTimeActivity>

        <ContentWrapper>
          <Timeline>
            {filteredThreads.map(thread => (
              <Post key={thread.id}>
                <p>
                  <a href={thread.permalink} target="_blank" rel="noopener noreferrer">
                    {thread.text || '내용 없음'}
                  </a>
                </p>
                <PostStats>
                  <span>좋아요: {thread.likes || 0}</span>
                  <span>답글: {thread.replies || 0}</span>
                  <span>조회수: {thread.views || 0}</span>
                  <small>{new Date(thread.timestamp).toLocaleString()}</small>
                </PostStats>
              </Post>
            ))}
          </Timeline>

          <Sidebar>
            <Widget>
              <h3>인사이트</h3>
              <Bar data={chartData} />
            </Widget>
            <Widget>
              <h3>키워드 클라우드</h3>
              <TagCloud minSize={12} maxSize={35} tags={wordCloudArray} />
            </Widget>
            <Widget>
              <h3>총계</h3>
              <p>총 좋아요: {totalStats.likes}</p>
              <p>총 답글: {totalStats.replies}</p>
              <p>총 조회수: {totalStats.views}</p>
            </Widget>
            <Widget>
              <h3>주요 상호작용</h3>
              {/* 주요 상호작용 데이터를 여기에 추가 */}
            </Widget>
          </Sidebar>
        </ContentWrapper>
      </MainContent>

      <Footer>
        <p>© 2024 <strong>WANNABE</strong> Inc.</p>
      </Footer>
    </PageContainer>
  );
};

// Styled components
const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #F8F9FA;
  color: #333;
`;

const Header = styled.header`
  background-color: #007AFF;
  color: white;
  padding: 20px 0;
  text-align: center;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const RealTimeActivity = styled.div`
  background-color: #e6f3ff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Timeline = styled.div`
  flex: 2;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  max-height: 800px;
  overflow-y: auto;
`;

const Sidebar = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const Widget = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Post = styled.div`
  border-bottom: 1px solid #eee;
  padding: 10px 0;
`;

const PostStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: #666;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px 0;
  background-color: #f1f1f1;
  margin-top: 20px;
  font-size: 12px;
  color: #636366;
`;

export default InfluencerPage;
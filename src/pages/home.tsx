import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import RealTimeActivity from '../components/RealTimeActivity';
import InfluencerRanking from '../components/InfluencerRanking';
import ActivityGraph from '../components/ActivityGraph';
import PopularKeywords from '../components/PopularKeywords';
import ChatChatPosts from '../components/ChatChatPosts';
import UserInteractions from '../components/UserInteractions';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const influencers = [
    { id: 'ho.en.y', name: 'ho.en.y' },
    // 다른 인플루언서들 추가
  ];

  const filteredInfluencers = influencers.filter(influencer =>
    influencer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInfluencerClick = (influencerId: string) => {
    const dashboardPath = '/Users/lhe339/Desktop/Wannabe/wannabe-admin-dashboard/wannabe-dashboard.html';
    window.open(`file://${dashboardPath}`, '_blank');
  };

  return (
    <div>
      <TextField
        fullWidth
        label="인플루언서 검색"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <List>
        {filteredInfluencers.map((influencer) => (
          <ListItem 
            key={influencer.id} 
            component={Link} 
            to={`/influencer/${influencer.id}`} 
            onClick={() => handleInfluencerClick(influencer.id)}
          >
            <ListItemText primary={influencer.name} />
          </ListItem>
        ))}
      </List>
      <div className="dashboard-grid">
        <RealTimeActivity />
        <InfluencerRanking />
        <ActivityGraph />
        <PopularKeywords />
        <ChatChatPosts />
        <UserInteractions />
      </div>
    </div>
  );
};

export default Home;
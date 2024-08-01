import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const InfluencerRanking: React.FC = () => {
  const influencers = [
    { name: '인플루언서1', score: 95 },
    { name: '인플루언서2', score: 90 },
    { name: '인플루언서3', score: 85 },
    { name: '인플루언서4', score: 80 },
    { name: '인플루언서5', score: 75 },
  ];

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          인플루언서 랭킹
        </Typography>
        <List>
          {influencers.map((influencer, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{index + 1}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={influencer.name} secondary={`점수: ${influencer.score}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default InfluencerRanking;
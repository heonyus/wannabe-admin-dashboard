import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

interface UserInteractionsProps {
  influencerId?: string;
}

const UserInteractions: React.FC<UserInteractionsProps> = ({ influencerId }) => {
  const interactions = [
    { user: '사용자1', type: '댓글 작성', target: '인플루언서1의 게시물' },
    { user: '사용자2', type: '좋아요', target: '인플루언서2의 댓글' },
    { user: '사용자3', type: '공유', target: '인플루언서3의 게시물' },
  ];

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {influencerId ? `사용자 상호작용 (인플루언서 ID: ${influencerId})` : '전체 사용자 상호작용'}
        </Typography>
        <List>
          {interactions.map((interaction, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={`${interaction.user}님이 ${interaction.type}했습니다.`}
                secondary={interaction.target}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UserInteractions;
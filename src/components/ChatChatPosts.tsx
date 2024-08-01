import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

interface ChatChatPostsProps {
  influencerId?: string;
}

const ChatChatPosts: React.FC<ChatChatPostsProps> = ({ influencerId }) => {
  const posts = [
    { title: '챗챗 사용 후기', author: '인플루언서1', link: '#' },
    { title: '챗챗으로 일상 관리하기', author: '인플루언서2', link: '#' },
    { title: '챗챗 꿀팁 모음', author: '인플루언서3', link: '#' },
  ];

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {influencerId ? `챗챗 관련 포스팅 (인플루언서 ID: ${influencerId})` : '챗챗 관련 포스팅'}
        </Typography>
        <List>
          {posts.map((post, index) => (
            <ListItem key={index} button component="a" href={post.link}>
              <ListItemText primary={post.title} secondary={`작성자: ${post.author}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ChatChatPosts;
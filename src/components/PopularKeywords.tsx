import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { TagCloud } from 'react-tagcloud';

interface PopularKeywordsProps {
  influencerId?: string;
}

const PopularKeywords: React.FC<PopularKeywordsProps> = ({ influencerId }) => {
  const data = [
    { value: 'React', count: 38 },
    { value: 'JavaScript', count: 30 },
    { value: 'TypeScript', count: 28 },
    { value: 'Node.js', count: 25 },
    { value: 'Express', count: 22 },
    { value: 'MongoDB', count: 20 },
    { value: 'Redux', count: 18 },
    { value: 'GraphQL', count: 15 },
  ];

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {influencerId ? `인기 키워드 (인플루언서 ID: ${influencerId})` : '인기 키워드'}
        </Typography>
        <TagCloud
          minSize={12}
          maxSize={35}
          tags={data}
          onClick={(tag: { value: string, count: number }) => console.log(`'${tag.value}' was selected!`)}
        />
      </CardContent>
    </Card>
  );
};

export default PopularKeywords;
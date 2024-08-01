import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ActivityGraphProps {
  influencerId?: string;
}

const ActivityGraph: React.FC<ActivityGraphProps> = ({ influencerId }) => {
  const data = [
    { time: '00:00', activity: 4 },
    { time: '03:00', activity: 3 },
    { time: '06:00', activity: 2 },
    { time: '09:00', activity: 6 },
    { time: '12:00', activity: 8 },
    { time: '15:00', activity: 9 },
    { time: '18:00', activity: 10 },
    { time: '21:00', activity: 7 },
  ];

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {influencerId ? `활동량 그래프 (인플루언서 ID: ${influencerId})` : '전체 활동량 그래프'}
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="activity" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ActivityGraph;
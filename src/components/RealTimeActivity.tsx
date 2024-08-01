import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface RealTimeActivityProps {
  influencerId?: string;
}

const RealTimeActivity: React.FC<RealTimeActivityProps> = ({ influencerId }) => {
  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {influencerId ? `실시간 활동 (인플루언서 ID: ${influencerId})` : '실시간 활동'}
        </Typography>
        <Typography variant="body2">
          휘서님이 새 쓰레드를 작성했습니다.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RealTimeActivity;
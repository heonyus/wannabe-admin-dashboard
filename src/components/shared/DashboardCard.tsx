import React, { ReactNode } from 'react';
import { Card, CardHeader, CardContent, Divider } from '@mui/material';

interface DashboardCardProps {
  title: string;
  action?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, action, footer, children }) => {
  return (
    <Card>
      <CardHeader title={title} action={action} />
      <Divider />
      <CardContent>{children}</CardContent>
      {footer && (
        <>
          <Divider />
          <CardContent>{footer}</CardContent>
        </>
      )}
    </Card>
  );
};

export default DashboardCard;
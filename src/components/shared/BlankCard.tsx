import React, { ReactNode } from 'react';
import { Card } from '@mui/material';

interface BlankCardProps {
  children: ReactNode;
}

const BlankCard: React.FC<BlankCardProps> = ({ children }) => {
  return <Card>{children}</Card>;
};

export default BlankCard;
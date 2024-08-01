import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabase';

interface Influencer {
  id: string;
  instagram_id: string;
}


const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [influencers, setInfluencers] = useState<Influencer[]>([]);

  useEffect(() => {
    fetchInfluencers();
  }, [searchTerm]);

  const fetchInfluencers = async () => {
    let query = supabase
      .from('users')
      .select('id, instagram_id')
      .order('instagram_id', { ascending: true });

    if (searchTerm) {
      query = query.ilike('instagram_id', `%${searchTerm}%`);
    } else {
      // 검색어가 없을 경우 빈 배열로 설정
      setInfluencers([]);
      return; // 더 이상 진행하지 않음
    }

    const { data, error } = await query;

    if (error) {
      console.error('인플루언서 데이터 가져오기 오류:', error);
    } else {
      setInfluencers(data || []);
    }
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
        {influencers.map((influencer) => (
          <ListItem 
            key={influencer.id} 
            component={Link} 
            to={`/influencer/${influencer.instagram_id}`}
          >
            <ListItemText primary={influencer.instagram_id} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Home;
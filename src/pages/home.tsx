import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

interface Influencer {
  id: string;
  instagram_id: string;
}

interface HomeProps {
  onLogin: (username: string) => void;
}

const Home: React.FC<HomeProps> = ({ onLogin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const fetchInfluencers = async () => {
    let query = supabase
      .from('users')
      .select('id, instagram_id')
      .order('instagram_id', { ascending: true });

    if (searchTerm) {
      query = query.ilike('instagram_id', `%${searchTerm}%`);
    } else {
      setInfluencers([]);
      return;
    }

    const { data, error } = await query;

    if (error) {
      console.error('인플루언서 데이터 가져오기 오류:', error);
    } else {
      setInfluencers(data || []);
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, [searchTerm]);

  const handleLogin = (loggedInUsername: string) => {
    setUsername(loggedInUsername);
    onLogin(loggedInUsername);
  };

  const handleSignUp = () => {
    setIsSignUp(false);
  };

  if (!username) {
    return isSignUp ? (
      <SignUp onSignUp={handleSignUp} />
    ) : (
      <Login onLogin={handleLogin} onSwitchToSignUp={() => setIsSignUp(true)} />
    );
  }

  return (
    <div>
      <h2>{username}님, 환영합니다!</h2>
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
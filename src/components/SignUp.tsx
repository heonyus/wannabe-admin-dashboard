import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { supabase } from '../config/supabase';

interface SignUpProps {
  onSignUp: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_SIGNUP_ATTEMPTS = 3;
  const SIGNUP_COOLDOWN = 60 * 60 * 1000; // 1시간

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const lastAttempt = localStorage.getItem('lastSignupAttempt');
    const attemptCount = parseInt(localStorage.getItem('signupAttemptCount') || '0');

    if (lastAttempt && Date.now() - parseInt(lastAttempt) < SIGNUP_COOLDOWN) {
      setError('너무 많은 회원가입 시도가 있었습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (attemptCount >= MAX_SIGNUP_ATTEMPTS) {
      setError('너무 많은 회원가입 시도가 있었습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      if (data.user) {
        onSignUp();
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('rate limit')) {
          setError('너무 많은 회원가입 시도가 있었습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setError('회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
      }
      console.error('회원가입 오류:', error);
    } finally {
      setIsSubmitting(false);
      localStorage.setItem('lastSignupAttempt', Date.now().toString());
      localStorage.setItem('signupAttemptCount', (attemptCount + 1).toString());
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography variant="h6">회원가입</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="사용자 이름"
        name="username"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="이메일 주소"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="비밀번호"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? '처리 중...' : '회원가입'}
      </Button>
    </Box>
  );
};

export default SignUp;
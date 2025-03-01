import React, { useState } from 'react';
import { Container, Box, Typography, Tabs, Tab, Button, TextField } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import { login, signup } from '../services/api';
import { useNavigate } from 'react-router-dom';

// Animated gradient keyframes
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Full-screen container with animated gradient background
const GradientContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  minWidth:'100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #ff6ec4, #7873f5, #6dcff6)',
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 10s ease infinite`,
  padding: theme.spacing(2)
}));

// Form container with semi-transparent background
const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  boxShadow: theme.shadows[6],
  width: '100%',
  maxWidth: 500
}));

const AuthPage = ({ onAuthSuccess }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleTabChange = (e, newValue) => {
    setTabIndex(newValue);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email: loginEmail, password: loginPassword });
      localStorage.setItem('token', res.data.token);
      onAuthSuccess();
      navigate('/dashboard');
    } catch (err) {
      console.error("Login failed:", err.response ? err.response.data : err);
    }
  };

  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({ username: signupUsername, email: signupEmail, password: signupPassword });
      localStorage.setItem('token', res.data.token);
      onAuthSuccess();
      navigate('/dashboard');
    } catch (err) {
      console.error("Signup failed:", err.response ? err.response.data : err);
    }
  };

  return (
    <GradientContainer maxWidth="sm">
      <FormBox>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <LockIcon sx={{ fontSize: 60, color: '#6dcff6' }} />
          <Typography variant="h4" gutterBottom>
            {tabIndex === 0 ? 'Login' : 'Sign Up'}
          </Typography>
        </Box>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {tabIndex === 0 ? (
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
                Sign In
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSignup}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </FormBox>
    </GradientContainer>
  );
};

export default AuthPage;

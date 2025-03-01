// client/src/components/GradientPage.jsx
import React from 'react';
import { Button, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const FullScreenContainer = styled('div')(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #ff6ec4, #7873f5, #6dcff6)',
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 10s ease infinite`,
  padding: theme.spacing(2),
  boxSizing: 'border-box'
}));

const GradientButton = styled(Button)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, #ff6ec4, #7873f5, #6dcff6)',
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 5s ease infinite`,
  color: '#fff',
  fontWeight: 'bold',
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  boxShadow: theme.shadows[4],
  transition: 'background 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #6dcff6, #7873f5, #ff6ec4)',
  }
}));

const GradientPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to a different route, e.g., '/dashboard'
    navigate('/auth');
  };

  return (
    <FullScreenContainer>
      <Typography variant="h2" color="white" sx={{ mb: 4, textAlign: 'center' }}>
        Welcome to the Task Manager Application.
      </Typography>
      <GradientButton variant="contained" onClick={handleGetStarted}>
        Get Create Task
      </GradientButton>
    </FullScreenContainer>
  );
};

export default GradientPage;

import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const DashboardContainer = styled(Container)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6dcff6, #67e8f9)',
  minHeight: '100vh',
  minWidth:"100%",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4)
}));

const Dashboard = ({ onLogout }) => {
  return (
    <DashboardContainer maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" color="white">
          Dashboard
        </Typography>
        <Button variant="contained" color="secondary" onClick={onLogout}>
          Logout
        </Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" color="white" gutterBottom>
          Manage your tasks:
        </Typography>
        <Button variant="outlined" component={Link} to="/tasks">
          View Tasks
        </Button>
      </Box>
    </DashboardContainer>
  );
};

export default Dashboard;

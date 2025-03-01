import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Box, Button } from '@mui/material';
import { fetchTasks, deleteTask } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.95)'
}));

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const res = await fetchTasks({ search });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, [search]);

  const handleDelete = async (id) => {
    try {
      console.log("Deleting task with id:", id);
      await deleteTask(id);
      getTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Your Tasks
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <input 
          type="text" 
          placeholder="Search by title" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{
            flexGrow: 1,
            padding: '8px',
            marginRight: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <Button variant="contained" onClick={() => navigate('/create-task')}>
          Create Task
        </Button>
      </Box>
      <List>
        {tasks.map((task, index) => (
          <Box key={task._id || task.id}>
            <ListItem>
              <ListItemText
                primary={task.title}
                secondary={
                  task.description + (task.completed ? ' (Completed)' : ' (Pending)')
                }
              />
            </ListItem>
            <Box sx={{ display: 'flex', gap: 1, pl: 2, pb: 1 }}>
              <Button variant="outlined" size="small" onClick={() => navigate(`/edit-task/${task._id || task.id}`)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(task._id || task.id)}>
                Delete
              </Button>
            </Box>
            {index < tasks.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
      <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </Button>
    </StyledPaper>
  );
};

export default TaskList;

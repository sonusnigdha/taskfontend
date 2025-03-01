import React, { useState, useEffect } from 'react';
import { createTask, updateTask, fetchTasks } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Paper, Typography, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.95)'
}));

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    priority: 'Medium',
    dueDate: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (id) {
        try {
          const res = await fetchTasks();
          const task = res.data.find(t => t._id === id || t.id === id);
          if (task) {
            setFormData({
              title: task.title,
              description: task.description,
              category: task.category,
              tags: task.tags.join(', '),
              priority: task.priority,
              dueDate: task.dueDate ? task.dueDate.substring(0, 10) : ''
            });
          }
        } catch (err) {
          console.error("Error loading task:", err);
        }
      }
    };
    loadTask();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };
      console.log("Submitting task payload:", payload);
      if (id) {
        await updateTask(id, payload);
      } else {
        await createTask(payload);
      }
      navigate('/tasks');
    } catch (err) {
      console.error("Task form submit error:", err);
    }
  };

  return (
    <FormPaper>
      <Typography variant="h6" gutterBottom>
        {id ? 'Edit Task' : 'Create Task'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          variant="outlined"
          margin="normal"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          fullWidth
          variant="outlined"
          margin="normal"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          label="Category"
          fullWidth
          variant="outlined"
          margin="normal"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <TextField
          label="Tags (comma separated)"
          fullWidth
          variant="outlined"
          margin="normal"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        />
        <TextField
          label="Priority"
          fullWidth
          variant="outlined"
          margin="normal"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          select
          SelectProps={{ native: true }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </TextField>
        <TextField
          label="Due Date"
          fullWidth
          variant="outlined"
          margin="normal"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained">
            {id ? 'Update Task' : 'Create Task'}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/tasks')}>
            Back
          </Button>
        </Box>
      </Box>
    </FormPaper>
  );
};

export default TaskForm;

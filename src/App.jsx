import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GradientPage from './components/GradientPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './app.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleAuthSuccess = () => setIsAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GradientPage />} />
        <Route
          path="/auth"
          element={
            !isAuthenticated ? (
              <AuthPage onAuthSuccess={handleAuthSuccess} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/tasks"
          element={
            isAuthenticated ? <TaskList /> : <Navigate to="/auth" replace />
          }
        />
        <Route
          path="/create-task"
          element={
            isAuthenticated ? <TaskForm /> : <Navigate to="/auth" replace />
          }
        />
        <Route
          path="/edit-task/:id"
          element={
            isAuthenticated ? <TaskForm /> : <Navigate to="/auth" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

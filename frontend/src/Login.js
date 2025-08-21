import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import './Login.css';

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Simulate API call (replace with your actual authentication endpoint)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if this is a Gmail user trying to login for the first time
      if (formData.email.endsWith('@gmail.com')) {
        // Check if user exists in localStorage (simulating a database check)
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = existingUsers.some(user => user.email === formData.email);
        
        if (!userExists) {
          throw new Error('Email or password is wrong. Please try again. If you don\'t have an account, please sign up.');
        }
      }
      
      // For demo purposes, accept any valid email format (if user exists or not Gmail)
      if (formData.email && formData.password) {
        // Store user info in localStorage (in real app, use secure tokens)
        const userData = {
          email: formData.email,
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        };
        
        // Store current user session
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Store in users array for future login checks (if not already there)
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = existingUsers.some(user => user.email === formData.email);
        
        if (!userExists) {
          existingUsers.push({
            email: formData.email,
            loginTime: new Date().toISOString()
          });
          localStorage.setItem('users', JSON.stringify(existingUsers));
        }
        
        onLogin({
          email: formData.email,
          isLoggedIn: true
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-container">
      <Container maxWidth="sm">
        <Paper elevation={8} className="login-card">
          <Box className="login-header">
            <Box className="logo-container">
              <PersonIcon className="logo-icon" />
            </Box>
            <Typography variant="h4" className="login-title">
              Welcome Back
            </Typography>
            <Typography variant="body1" className="login-subtitle">
              Sign in to continue to your mental health companion
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} className="login-form">
            {error && (
              <Alert severity="error" className="error-alert">
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {error}
                </Typography>
                {error.includes('Please try again') && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 500 }}>
                      💡 Don't have an account? 
                    </Typography>
                    <Button
                      variant="text"
                      onClick={onSwitchToSignup}
                      sx={{ 
                        color: '#1976d2', 
                        textDecoration: 'underline',
                        p: 0,
                        minWidth: 'auto',
                        fontSize: '14px'
                      }}
                    >
                      Click here to sign up
                    </Button>
                  </Box>
                )}
              </Alert>
            )}

            <TextField
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              className="form-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              required
            />

            <TextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              className="form-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>

            <Box className="login-footer">
              <Typography variant="body2" className="footer-text">
                Don't have an account?{' '}
                <Button
                  variant="text"
                  onClick={onSwitchToSignup}
                  className="switch-button"
                >
                  Sign Up
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;

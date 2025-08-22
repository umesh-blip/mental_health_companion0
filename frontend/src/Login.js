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
  IconButton,
  Chip
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon,
  Info as InfoIcon
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
      // Basic validation - just check if fields are not empty
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      // TEMPORARY LOGIN: Accept any credentials for demo purposes
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Store user info in localStorage
      const userData = {
        email: formData.email,
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
        isDemoUser: true // Mark as demo user
      };
      
      // Store current user session
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Store in users array for future reference
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.some(user => user.email === formData.email);
      
      if (!userExists) {
        existingUsers.push({
          email: formData.email,
          loginTime: new Date().toISOString(),
          isDemoUser: true
        });
        localStorage.setItem('users', JSON.stringify(existingUsers));
      }
      
      onLogin({
        email: formData.email,
        isLoggedIn: true,
        isDemoUser: true
      });
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={24} 
          sx={{ 
            padding: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 3,
            width: '100%',
            maxWidth: 450
          }}
        >
          {/* Demo Mode Banner */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Chip 
              icon={<InfoIcon />}
              label="DEMO MODE - Any Credentials Accepted"
              color="primary"
              variant="filled"
              sx={{ 
                mb: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white',
                fontWeight: 'bold'
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              🎯 <strong>Demo Login:</strong> Enter any email and password to access the chatbot
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Example: demo@test.com / password123
            </Typography>
          </Box>

          <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
            Welcome to WizCare
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Your AI Mental Health Companion
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 2, 
                mb: 2,
                py: 1.5,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                }
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                '🚀 Enter WizCare (Demo Mode)'
              )}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Button
                  onClick={onSwitchToSignup}
                  sx={{ 
                    textTransform: 'none',
                    color: '#1976d2',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Sign up here
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;

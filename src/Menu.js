import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState(null); 

  const isActive = (path) => location.pathname === path;

  const handleMouseEnter = (path) => setHovered(path);
  const handleMouseLeave = () => setHovered(null);

  const menuItems = [
    { label: 'New', path: '/' },
    { label: 'Top', path: '/top' },
    { label: 'Comments', path: '/comments' },
    { label: 'Ask', path: '/ask' },
    { label: 'Show', path: '/show' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Login', path: '/login' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000' }}>
      <Toolbar>
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
          HackerNews
        </Typography>

        {menuItems.map(({ label, path }) => (
          <Button
            key={path}
            component={Link}
            to={path}
            sx={{
              color: isActive(path) ? 'white' : 'inherit', 
              backgroundColor: isActive(path)
                ? 'rgba(255, 255, 255, 0.2)'
                : hovered === path
                ? 'rgba(255, 255, 255, 0.1)'
                : 'inherit',
              borderRadius: 1,
              transition: 'background-color 0.3s ease', 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)', 
              },
            }}
            onMouseEnter={() => handleMouseEnter(path)}
            onMouseLeave={handleMouseLeave}
            aria-label={`Navigate to ${label}`}
          >
            {label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;

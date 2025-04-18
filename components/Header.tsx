'use client';

import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  useScrollTrigger, 
  Slide, 
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CodeIcon from '@mui/icons-material/Code';

interface HeaderProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header({ toggleTheme, darkMode }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '100%', py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
          <CodeIcon sx={{ mr: 1 }} />
          Dev Portfolio
        </Typography>
        <IconButton edge="end" color="inherit" aria-label="close drawer" onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ my: 2 }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemText 
              primary={item.name} 
              sx={{ 
                textAlign: 'center',
                '& span': {
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  py: 1,
                  display: 'block',
                }
              }} 
              onClick={() => {
                const element = document.querySelector(item.href);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <FormControlLabel
        control={
          <Switch 
            checked={darkMode} 
            onChange={toggleTheme} 
            color="primary"
          />
        }
        label={darkMode ? "Dark Mode" : "Light Mode"}
        sx={{ mt: 2 }}
      />
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          color="inherit" 
          elevation={scrolled ? 4 : 0}
          sx={{
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            background: scrolled 
              ? theme.palette.mode === 'dark' 
                ? 'rgba(15, 23, 42, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)'
              : 'transparent',
            borderBottom: scrolled ? '1px solid' : 'none',
            borderColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, #38bdf8, #818cf8)' 
                    : 'linear-gradient(90deg, #3a86ff, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <CodeIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                DEV PORTFOLIO
              </Typography>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {navItems.map((item) => (
                    <Button 
                      key={item.name} 
                      color="inherit" 
                      sx={{ 
                        mx: 1, 
                        position: 'relative',
                        fontWeight: 500,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: '0%',
                          height: '2px',
                          bottom: '0',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: theme.palette.primary.main,
                          transition: 'width 0.3s ease',
                        },
                        '&:hover::after': {
                          width: '80%',
                        },
                      }}
                      onClick={() => {
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                  <IconButton 
                    color="inherit" 
                    onClick={toggleTheme} 
                    sx={{ 
                      ml: 2,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'rotate(30deg)',
                      }
                    }}
                  >
                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Box>
              )}

              {/* Mobile Navigation */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            background: theme.palette.background.default,
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Toolbar spacer */}
      <Toolbar />
    </>
  );
}

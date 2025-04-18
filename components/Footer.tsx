'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Grid, 
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { contactInfo } from '../contactInfo';

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        background: theme.palette.mode === 'dark' 
          ? 'rgba(15, 23, 42, 0.9)' 
          : 'rgba(248, 250, 252, 0.9)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid',
        borderColor: theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.08)' 
          : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #38bdf8, #818cf8)' 
                  : 'linear-gradient(90deg, #3a86ff, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              DEV PORTFOLIO
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              A showcase of my skills, projects, and professional journey as a developer and architect.
              Built with React, Next.js, and Material UI.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <IconButton
                aria-label="GitHub"
                component="a"
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': { color: theme.palette.primary.main } 
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                component="a"
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': { color: theme.palette.primary.main } 
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column' }}>
              {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  underline="hover"
                  color="text.secondary"
                  sx={{ 
                    mb: 1,
                    '&:hover': { color: theme.palette.primary.main } 
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(`#${item.toLowerCase()}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Email: {contactInfo.email}
            </Typography>
            {/* Add location to contactInfo if needed */}
            <Box sx={{ mt: 2 }}>
              <Link
                href="#contact"
                underline="none"
                sx={{
                  display: 'inline-block',
                  py: 1,
                  px: 2,
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.03)',
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get in Touch
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Santosh Kui. All rights reserved.
          </Typography>
          
          <IconButton
            onClick={scrollToTop}
            aria-label="Scroll to top"
            sx={{
              bgcolor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.03)',
              '&:hover': {
                bgcolor: theme.palette.primary.main,
                color: 'white',
              }
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

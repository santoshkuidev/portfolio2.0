'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Stack, 
  useTheme, 
  Avatar,
  Paper
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

// Simple social media icon button component
function IconButton({ github, linkedin, twitter }: { github?: boolean, linkedin?: boolean, twitter?: boolean }) {
  const theme = useTheme();
  const Icon = github ? GitHubIcon : linkedin ? LinkedInIcon : TwitterIcon;
  const url = github 
    ? 'https://github.com/yourusername' 
    : linkedin 
      ? 'https://linkedin.com/in/yourusername' 
      : 'https://twitter.com/yourusername';
  
  return (
    <Box
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.divider}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          transform: 'translateY(-3px)',
        },
      }}
    >
      <Icon fontSize="small" />
    </Box>
  );
}

export default function HeroSection() {
  const theme = useTheme();

  return (
    <Box 
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 4, md: 0 },
      }}
    >
      {/* Simple background accent */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 30% 40%, rgba(56, 189, 248, 0.05) 0%, rgba(0, 0, 0, 0) 35%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.05) 0%, rgba(0, 0, 0, 0) 35%)'
            : 'radial-gradient(circle at 30% 40%, rgba(58, 134, 255, 0.05) 0%, rgba(0, 0, 0, 0) 35%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, rgba(0, 0, 0, 0) 35%)',
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 6, md: 4 },
          }}
        >
          {/* Text content */}
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: '60%' } }}>
            <Box>
              <Typography
                variant="overline"
                component="div"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  mb: 1,
                }}
              >
                LEADER | ARCHITECT | DEVELOPER | ENTHUSIAST
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, #38bdf8, #a855f7)'
                    : 'linear-gradient(90deg, #3a86ff, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                }}
              >
                Creating Exceptional Digital Experiences
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                I build innovative, responsive, and futuristic web applications that deliver amazing user experiences and push the boundaries of modern web technology.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                  href="#contact"
                >
                  Contact Me
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 600,
                    borderWidth: 2,
                  }}
                  href="#projects"
                >
                  View Projects
                </Button>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <IconButton github />
                <IconButton linkedin />
                <IconButton twitter />
              </Stack>
            </Box>
          </Box>

          {/* Avatar */}
          <Box
            sx={{
              flex: { xs: '0 0 100%', md: '0 0 40%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Paper
              elevation={3}
              sx={{
                borderRadius: '24px',
                overflow: 'hidden',
                width: { xs: '280px', sm: '320px', md: '380px' },
                height: { xs: '280px', sm: '320px', md: '380px' },
              }}
            >
              <Avatar
                alt="Developer"
                src="/p-2.png" 
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 0,
                  objectFit: 'cover',
                }}
              >
                LA {/* Fallback if image doesn't load */}
              </Avatar>
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* Simple scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0.7,
        }}
      >
        <Typography variant="caption" sx={{ mb: 1, fontWeight: 500 }}>
          Scroll Down
        </Typography>
        <Box
          sx={{
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowForwardIcon 
            sx={{ 
              transform: 'rotate(90deg)',
              fontSize: '1.5rem',
              color: theme.palette.text.secondary
            }} 
          />
        </Box>
      </Box>
    </Box>
  );
}

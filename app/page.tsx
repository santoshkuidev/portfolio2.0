'use client';

import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../components/ThemeRegistry';

// Components
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Simple gradient background */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        }}
      />

      {/* Header */}
      <Header toggleTheme={colorMode.toggleColorMode} darkMode={colorMode.mode === 'dark'} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

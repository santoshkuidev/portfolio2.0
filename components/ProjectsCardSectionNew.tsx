'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  useTheme,
  Chip,
  useMediaQuery,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Paper
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  video?: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  features: string[];
  category: 'web' | 'mobile' | 'design' | 'other';
}

// Custom hook for immediate response to click
function useImmediateAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const triggerAnimation = useCallback(() => {
    // Use requestAnimationFrame to ensure the animation starts on the next frame
    requestAnimationFrame(() => {
      setIsAnimating(true);
    });
    
    return true; // Return true to allow the original click handler to proceed
  }, []);
  
  return { isAnimating, triggerAnimation, setIsAnimating };
}

export default function ProjectsCardSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { isAnimating, triggerAnimation, setIsAnimating } = useImmediateAnimation();
  const [filter, setFilter] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  // Reduced number of cards to show to make them larger
  const cardsToShow = isMobile ? 1 : isMedium ? 1 : 2;

  const projects: Project[] = [
    {
      id: 'project-1',
      title: 'AI-Powered Analytics Dashboard',
      description: 'A real-time analytics platform with AI-driven insights and interactive visualizations.',
      longDescription: 'This enterprise-grade analytics dashboard leverages machine learning algorithms to provide predictive insights and anomaly detection. Built with a React frontend and Node.js backend, it processes millions of data points in real-time and presents them through interactive D3.js visualizations. The system includes role-based access control, customizable dashboards, and automated reporting features.',
      image: '/galaxy-bg.jpg',
      technologies: ['React', 'TypeScript', 'Node.js', 'D3.js', 'TensorFlow.js', 'WebSockets'],
      demoUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/yourusername/project',
      features: [
        'Real-time data processing and visualization',
        'Machine learning-based predictions and anomaly detection',
        'Interactive dashboards with drag-and-drop customization',
        'Automated report generation and scheduling',
        'Role-based access control and user management'
      ],
      category: 'web'
    },
    {
      id: 'project-2',
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with headless CMS, payment processing, and inventory management.',
      longDescription: 'This full-featured e-commerce solution combines a Next.js frontend with a headless CMS for content management. It includes Stripe integration for secure payments, real-time inventory tracking, and a comprehensive admin dashboard. The platform is optimized for performance with server-side rendering, image optimization, and efficient caching strategies.',
      image: '/galaxy-bg.jpg',
      technologies: ['Next.js', 'GraphQL', 'Stripe', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
      demoUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/yourusername/project',
      features: [
        'Headless CMS for flexible content management',
        'Secure payment processing with Stripe',
        'Real-time inventory and order management',
        'Responsive design with mobile-first approach',
        'SEO optimization and performance tuning'
      ],
      category: 'web'
    },
    {
      id: 'project-3',
      title: 'Virtual Chat Assistant',
      description: 'A virtual chat assistant with AI-powered responses and natural language processing.',
      longDescription: 'This intelligent chat assistant uses natural language processing to understand user questions and provide contextually relevant responses. It integrates with OpenAI API for relevant responses. The system learns from interactions to improve response accuracy over time and supports voice interaction.',
      image: '/galaxy-bg.jpg',
      video: '/Virtual_Bot.mp4',
      technologies: ['Python', 'Vercel', 'OpenAI', 'React', 'Material UI'],
      demoUrl: 'https://santoshkuidev.github.io/voice-chat-assistant/',
      githubUrl: 'https://github.com/santoshkuidev/voice-chat-assistant',
      features: [
        'Natural language understanding and generation',
        'Context-aware conversation management',
        'Integration with external APIs for enhanced responses',
        'Multi-language support through automatic translation',
        'Progressive learning from user interactions'
      ],
      category: 'web'
    },
    {
      id: 'project-4',
      title: 'Mobile Fitness Tracker',
      description: 'A comprehensive fitness tracking app with workout plans, nutrition tracking, and progress analytics.',
      longDescription: 'This cross-platform mobile application provides users with personalized workout plans, nutrition tracking, and detailed progress analytics. It integrates with wearable devices for real-time health data collection and offers social features for community engagement. The app includes video tutorials, voice coaching, and AI-powered form correction for exercises.',
      image: '/galaxy-bg.jpg',
      technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux', 'TensorFlow Lite', 'HealthKit/Google Fit'],
      demoUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/yourusername/project',
      features: [
        'Personalized workout and nutrition planning',
        'Integration with wearable devices and health platforms',
        'AI-powered exercise form analysis and correction',
        'Detailed progress tracking and analytics',
        'Community features and challenges'
      ],
      category: 'mobile'
    },
    {
      id: 'project-5',
      title: 'Interactive Data Visualization Tool',
      description: 'A powerful data visualization tool for creating interactive charts, graphs, and dashboards.',
      longDescription: 'This web-based data visualization platform enables users to create stunning interactive visualizations from various data sources. It supports real-time data streaming, collaborative editing, and a wide range of chart types and customization options. The tool includes an intuitive drag-and-drop interface and advanced filtering capabilities for data exploration.',
      image: '/galaxy-bg.jpg',
      technologies: ['D3.js', 'React', 'Node.js', 'WebSockets', 'MongoDB', 'Redis'],
      demoUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/yourusername/project',
      features: [
        'Interactive chart creation with drag-and-drop interface',
        'Support for multiple data sources and formats',
        'Real-time data streaming and updates',
        'Collaborative editing and sharing capabilities',
        'Advanced filtering and data transformation tools'
      ],
      category: 'web'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Handle navigation
  const handleNext = () => {
    if (currentIndex < filteredProjects.length - cardsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Auto-scrolling effect
  const autoScroll = useCallback(() => {
    if (filteredProjects.length <= cardsToShow) return;
    
    const nextIndex = (currentIndex + 1) % (filteredProjects.length - cardsToShow + 1);
    setCurrentIndex(nextIndex);
  }, [currentIndex, filteredProjects.length, cardsToShow]);

  // Set up auto-scrolling interval
  useEffect(() => {
    if (selectedProject) return; // Don't auto-scroll when a project is selected
    
    const interval = setInterval(autoScroll, 5000); // Auto-scroll every 5 seconds
    return () => clearInterval(interval);
  }, [autoScroll, selectedProject]);
  
  // Smooth scroll to selected project
  useEffect(() => {
    if (cardsContainerRef.current && !selectedProject) {
      const scrollAmount = currentIndex * (cardsContainerRef.current.offsetWidth / cardsToShow);
      cardsContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, cardsToShow, selectedProject]);

  // Get visible projects
  const visibleProjects = filteredProjects.slice(
    currentIndex,
    currentIndex + cardsToShow
  );

  return (
    <Box
      id="projects"
      ref={containerRef}
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(to bottom, #0a0a0a, #1a1a2e)' 
          : 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
      }}
    >
      <Container maxWidth="xl">
        <Typography 
          variant="h2" 
          component="h2" 
          gutterBottom 
          align="center"
          sx={{ 
            fontWeight: 800,
            mb: 6,
            position: 'relative',
            zIndex: 2,
          }}
        >
          Featured Projects
        </Typography>
        
        <AnimatePresence mode="wait">
          {selectedProject ? (
            // Detailed project view
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              transition={{ 
                duration: 0.4, 
                type: "spring", 
                stiffness: 300,
                damping: 30
              }}
            >
              {filteredProjects.filter(p => p.id === selectedProject).map(project => (
                <Paper 
                  key={project.id} 
                  elevation={12}
                  sx={{ 
                    p: { xs: 3, md: 5 }, 
                    borderRadius: 4,
                    background: theme.palette.mode === 'dark' 
                      ? 'linear-gradient(145deg, #1e1e30, #2a2a42)' 
                      : 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '16px 16px 32px #0a0a0a, -16px -16px 32px #1e1e30'
                      : '16px 16px 32px #d1d1d1, -16px -16px 32px #ffffff',
                    mb: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    maxWidth: '1200px',
                    mx: 'auto'
                  }}
                >
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => {
                      triggerAnimation();
                      setTimeout(() => setSelectedProject(null), 50);
                    }}
                    sx={{ 
                      position: 'absolute', 
                      top: 16, 
                      right: 16, 
                      minWidth: 'auto',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      zIndex: 10
                    }}
                  >
                    ×
                  </Button>
                  
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ 
                        width: '100%', 
                        height: { xs: 250, md: 400 },
                        borderRadius: 2,
                        mb: 2,
                        boxShadow: 4,
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        {project.video ? (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'contain',
                              backgroundColor: 'black'
                            }}
                          >
                            <source src={project.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <Box 
                            component="img"
                            src={project.image}
                            alt={project.title}
                            sx={{ 
                              width: '100%', 
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        )}
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
                        {project.technologies.map(tech => (
                          <Chip 
                            key={tech} 
                            label={tech} 
                            color="primary" 
                            variant="outlined"
                            sx={{ 
                              fontWeight: 500,
                              borderRadius: 1,
                              '& .MuiChip-label': { px: 1 }
                            }}
                          />
                        ))}
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        {project.demoUrl && (
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<LaunchIcon />}
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ borderRadius: 2, px: 3 }}
                          >
                            Live Demo
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<GitHubIcon />}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ borderRadius: 2, px: 3 }}
                          >
                            GitHub
                          </Button>
                        )}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="h3" component="h3" gutterBottom fontWeight={700}>
                        {project.title}
                      </Typography>
                      
                      <Typography variant="body1" paragraph>
                        {project.longDescription}
                      </Typography>
                      
                      <Typography variant="h5" component="h4" gutterBottom fontWeight={600} sx={{ mt: 3 }}>
                        Key Features
                      </Typography>
                      
                      <Box component="ul" sx={{ pl: 2 }}>
                        {project.features.map((feature, index) => (
                          <Typography 
                            key={index} 
                            component="li" 
                            variant="body1" 
                            sx={{ mb: 1 }}
                          >
                            {feature}
                          </Typography>
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </motion.div>
          ) : (
            // Cards view
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ position: 'relative', mb: 4 }}>
                <Box
                  ref={cardsContainerRef}
                  sx={{
                    display: 'flex',
                    gap: 4,
                    overflowX: 'hidden',
                    scrollBehavior: 'smooth',
                    py: 4,
                    px: 2,
                    mx: { xs: -2, md: 0 },
                    '&:after': {
                      content: '""',
                      minWidth: '25%', // Add empty space at the end to indicate more content
                    }
                  }}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                      style={{
                        flex: `0 0 calc(${100 / cardsToShow}% - ${(cardsToShow - 1) * 12 / cardsToShow}px)`,
                        minWidth: isMobile ? '90vw' : `calc(${100 / cardsToShow}% - ${(cardsToShow - 1) * 12 / cardsToShow}px)`,
                      }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: 4,
                          overflow: 'hidden',
                          boxShadow: theme.palette.mode === 'dark'
                            ? '12px 12px 24px #0a0a0a, -12px -12px 24px #1e1e30'
                            : '12px 12px 24px #d1d1d1, -12px -12px 24px #ffffff',
                          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                          '&:hover': {
                            transform: 'translateY(-12px) scale(1.02)',
                            boxShadow: theme.palette.mode === 'dark'
                              ? '16px 16px 32px #0a0a0a, -16px -16px 32px #1e1e30'
                              : '16px 16px 32px #d1d1d1, -16px -16px 32px #ffffff',
                          },
                          background: theme.palette.mode === 'dark' ? '#1a1a2e' : '#ffffff'
                        }}
                      >
                        <CardActionArea 
                          onClick={() => {
                            triggerAnimation();
                            // Small timeout to allow animation to start before changing state
                            setTimeout(() => setSelectedProject(project.id), 50);
                          }}
                          sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                        >
                          <Box sx={{ position: 'relative', height: 350, overflow: 'hidden' }}>
                            {project.video ? (
                              <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{ 
                                  width: '100%', 
                                  height: '100%', 
                                  objectFit: 'contain',
                                  backgroundColor: 'black'
                                }}
                              >
                                <source src={project.video} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <Box
                                component="img"
                                src={project.image}
                                alt={project.title}
                                sx={{ 
                                  width: '100%', 
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                            )}
                            
                            {/* Text overlay */}
                            <Box sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              p: 3,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)',
                              color: 'white',
                              textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
                            }}>
                              <Typography variant="h5" component="h3" gutterBottom fontWeight={700}>
                                {project.title}
                              </Typography>
                              <Typography variant="body2" sx={{ opacity: 0.9 }} paragraph>
                                {project.description}
                              </Typography>
                            </Box>
                          </Box>
                          <CardContent sx={{ flexGrow: 0, display: 'flex', flexDirection: 'column', p: 3 }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                              {project.technologies.slice(0, 3).map((tech) => (
                                <Chip 
                                  key={tech} 
                                  label={tech} 
                                  size="small" 
                                  variant="outlined"
                                  sx={{ borderRadius: 1 }}
                                />
                              ))}
                              {project.technologies.length > 3 && (
                                <Chip 
                                  label={`+${project.technologies.length - 3}`} 
                                  size="small" 
                                  sx={{ borderRadius: 1 }}
                                />
                              )}
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </motion.div>
                  ))}
                </Box>
                
                {/* Navigation controls */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
                  <IconButton 
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    color="primary"
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      boxShadow: 2,
                      backgroundColor: theme.palette.background.paper,
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      }
                    }}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                  
                  <IconButton 
                    onClick={handleNext}
                    disabled={currentIndex >= filteredProjects.length - cardsToShow}
                    color="primary"
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      boxShadow: 2,
                      backgroundColor: theme.palette.background.paper,
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      }
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
                
                {/* Pagination indicator */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  {Array.from({ length: Math.ceil(filteredProjects.length / cardsToShow) }).map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        mx: 0.5,
                        backgroundColor: currentIndex === index * cardsToShow 
                          ? theme.palette.primary.main 
                          : theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onClick={() => setCurrentIndex(index * cardsToShow)}
                    />
                  ))}
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}

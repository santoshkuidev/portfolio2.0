'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  useTheme,
  Chip,
  useMediaQuery
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  video?: string; // Optional mp4 video to embed in carousel
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  features: string[];
  category: 'web' | 'mobile' | 'design' | 'other';
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  // Snap state
  const [isSnapActive, setIsSnapActive] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Only enable snap when section is fully in view
  useEffect(() => {
    if (isMobile) return;
    if (!containerRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsSnapActive(entry.intersectionRatio === 1);
      },
      { threshold: 1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 'project-1',
      title: 'AI-Powered Analytics Dashboard',
      description: 'A real-time analytics platform with AI-driven insights and interactive visualizations.',
      longDescription: 'This enterprise-grade analytics dashboard leverages machine learning algorithms to provide predictive insights and anomaly detection. Built with a React frontend and Node.js backend, it processes millions of data points in real-time and presents them through interactive D3.js visualizations. The system includes role-based access control, customizable dashboards, and automated reporting features.',
      image: './project1.jpg',
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
      image: './project2.jpg',
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
      longDescription: 'This virtual chat assistant combines a React frontend with a Node.js backend to provide real-time chat functionality. It includes natural language processing capabilities and integrates with OpenAI for AI-powered responses. The application is optimized for performance with caching strategies and responsive design, making it accessible across all devices. It is equipped with my profile as context and could respond about my portfolio.',
      image: './project3.jpg',
      video: '/Virtual_Bot.mp4',
      technologies: ['React', 'TypeScript', 'Node.js', 'Material-UI', 'OpenAI'],
      demoUrl: 'https://santoshkuidev.github.io/voice-chat-assistant/',
      githubUrl: 'https://github.com/santoshkuidev/voice-chat-assistant',
      features: [
        'Real-time chat functionality',
        'Natural language processing',
        'AI-powered responses',
        'Context-aware responses',
        'Responsive design'
      ],
      category: 'design'
    },
    {
      id: 'project-4',
      title: 'Mobile Fitness App',
      description: 'A cross-platform fitness application with workout tracking, nutrition planning, and social features.',
      longDescription: 'This comprehensive fitness application helps users track workouts, plan nutrition, and connect with fitness communities. Built with React Native for cross-platform compatibility, it includes features like GPS tracking for runs, custom workout builders, meal planning with calorie counting, and social sharing capabilities. The app integrates with wearable devices for enhanced tracking accuracy.',
      image: './project4.jpg',
      technologies: ['React Native', 'Firebase', 'Redux', 'Node.js', 'MongoDB'],
      demoUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/yourusername/project',
      features: [
        'Cross-platform mobile application',
        'GPS tracking for outdoor activities',
        'Custom workout planning and tracking',
        'Nutrition management with calorie counting',
        'Social features for community engagement'
      ],
      category: 'mobile'
    }
  ];

  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Get unique categories from projects
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  return (
    <Box
      id="projects"
      ref={containerRef}
      sx={{
        height: '100vh',
        position: isMobile ? 'static' : 'sticky',
        top: 0,
        zIndex: 2,
        overflow: 'hidden',
        background: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Simple background gradient instead of complex animation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.8) 100%)'
            : 'linear-gradient(180deg, rgba(248, 250, 252, 0) 0%, rgba(248, 250, 252, 0.8) 100%)',
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            MY WORK
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #38bdf8, #a855f7)'
                : 'linear-gradient(90deg, #3a86ff, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Featured Projects
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Explore my portfolio of innovative web applications, each designed with a focus on performance, user experience, and cutting-edge technology.
          </Typography>
        </Box>

        {/* Project category filter */}
        <Box sx={{ mb: 6 }}>
          <Grid 
            container 
            spacing={2} 
            justifyContent="center"
          >
            {categories.map((category) => (
              <Grid item xs={12} key={category}>
                <Button
                  variant={filter === category ? 'contained' : 'outlined'}
                  onClick={() => setFilter(category)}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 0.75,
                    textTransform: 'capitalize',
                    fontWeight: 500,
                    minWidth: 'auto',
                    transition: 'all 0.2s'
                  }}
                >
                  {category === 'all' ? 'All Projects' : `${category.charAt(0).toUpperCase() + category.slice(1)}`}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          ref={carouselRef}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollSnapType: isSnapActive ? 'y mandatory' : 'none',
            scrollBehavior: 'smooth',
            gap: 0,
            py: 0,
            px: 0,
            width: '100vw',
            maxHeight: '100vh',
            position: 'relative',
            left: '50%',
            right: '50%',
            transform: 'translateX(-50%)',
            '::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              sx={{
                minWidth: '100vw',
                maxWidth: '100vw',
                minHeight: '100vh',
                maxHeight: '100vh',
                flex: '0 0 auto',
                scrollSnapAlign: 'start',
                boxShadow: 4,
                borderRadius: 0,
                mx: 0,
                my: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                borderRight: !isMobile ? '2px solid #e0e0e0' : 'none',
                borderBottom: isMobile ? '2px solid #e0e0e0' : 'none',
                p: 0
              }}
            >
              {/* Stacked layout: video/image on top, info below */}
              <Box sx={{ width: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', height: isMobile ? 240 : 400, overflow: 'hidden' }}>
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 0, background: '#000' }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    image={project.image || "https://source.unsplash.com/random/600x400/?tech"}
                    alt={project.title}
                  />
                )}
              </Box>
              <CardContent
                sx={{
                  flexGrow: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  px: isMobile ? 2 : 3,
                  py: isMobile ? 1 : 2,
                  width: '100%',
                  maxHeight: isMobile ? 160 : 220,
                  overflow: 'auto',
                  boxSizing: 'border-box',
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="h3" component="h3" gutterBottom fontWeight={800} textAlign={isMobile ? 'left' : 'center'}>
                  {project.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 2, textAlign: isMobile ? 'left' : 'center' }}>
                  {project.description}
                </Typography>
                {project.demoUrl && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ fontWeight: 700, mb: 2 }}
                  >
                    Live Demo
                  </Button>
                )}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2, justifyContent: isMobile ? 'flex-start' : 'center' }}>
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Chip key={tech} label={tech} size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>


        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button variant="outlined" color="primary" size="large" endIcon={<ArrowForwardIcon />} sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 600, borderWidth: 2 }}>
            View All Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
};


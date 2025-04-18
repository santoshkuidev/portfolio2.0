'use client';

import React, { useState } from 'react';
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
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  useMediaQuery
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Transition for dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  features: string[];
  category: 'web' | 'mobile' | 'design' | 'other';
}

export default function ProjectsSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 'project-1',
      title: 'AI-Powered Analytics Dashboard',
      description: 'A real-time analytics platform with AI-driven insights and interactive visualizations.',
      longDescription: 'This enterprise-grade analytics dashboard leverages machine learning algorithms to provide predictive insights and anomaly detection. Built with a React frontend and Node.js backend, it processes millions of data points in real-time and presents them through interactive D3.js visualizations. The system includes role-based access control, customizable dashboards, and automated reporting features.',
      image: '/project1.jpg',
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
      image: '/project2.jpg',
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
      title: '3D Product Configurator',
      description: 'An interactive 3D product configurator allowing users to customize products in real-time.',
      longDescription: 'This WebGL-based 3D product configurator enables users to customize products with different colors, materials, and components in real-time. The application uses Three.js for rendering and includes a physics engine for realistic simulations. It features a responsive design that works across desktop and mobile devices, with touch and gesture support for intuitive interactions.',
      image: '/project3.jpg',
      technologies: ['Three.js', 'WebGL', 'React', 'TypeScript', 'Node.js'],
      demoUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/yourusername/project',
      features: [
        'Real-time 3D rendering with WebGL',
        'Interactive product customization',
        'Physics-based simulations for realistic preview',
        'Cross-platform compatibility',
        'Touch and gesture support for mobile devices'
      ],
      category: 'design'
    },
    {
      id: 'project-4',
      title: 'Mobile Fitness App',
      description: 'A cross-platform fitness application with workout tracking, nutrition planning, and social features.',
      longDescription: 'This comprehensive fitness application helps users track workouts, plan nutrition, and connect with fitness communities. Built with React Native for cross-platform compatibility, it includes features like GPS tracking for runs, custom workout builders, meal planning with calorie counting, and social sharing capabilities. The app integrates with wearable devices for enhanced tracking accuracy.',
      image: '/project4.jpg',
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

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <Box 
      id="projects"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
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
              <Grid item key={category}>
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
        
        <Grid container spacing={4}>
          {filteredProjects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Box
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 4,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(90deg, #38bdf8, #818cf8)'
                        : 'linear-gradient(90deg, #3a86ff, #8b5cf6)',
                      zIndex: 1,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image || "https://source.unsplash.com/random/600x400/?tech"}
                    alt={project.title}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Chip 
                          key={tech} 
                          label={tech} 
                          size="small" 
                          sx={{ 
                            fontSize: '0.7rem',
                            height: 24,
                            bgcolor: theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.05)' 
                              : 'rgba(0, 0, 0, 0.05)',
                          }} 
                        />
                      ))}
                      {project.technologies.length > 4 && (
                        <Chip 
                          label={`+${project.technologies.length - 4}`} 
                          size="small" 
                          sx={{ 
                            fontSize: '0.7rem',
                            height: 24,
                            bgcolor: theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.05)' 
                              : 'rgba(0, 0, 0, 0.05)',
                          }} 
                        />
                      )}
                    </Box>
                    
                    <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => handleOpenProject(project)}
                        sx={{
                          borderRadius: 2,
                          fontWeight: 500,
                        }}
                      >
                        View Details
                      </Button>
                      
                      <Box>
                        {project.githubUrl && (
                          <IconButton 
                            size="small" 
                            aria-label="github repository"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GitHubIcon fontSize="small" />
                          </IconButton>
                        )}
                        {project.demoUrl && (
                          <IconButton 
                            size="small" 
                            aria-label="live demo"
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                          >
                            <LaunchIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        {/* View all projects button */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderWidth: 2,
            }}
          >
            View All Projects
          </Button>
        </Box>
      </Container>

      {/* Project Details Dialog */}
      <Dialog
        open={!!selectedProject}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseProject}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 4,
            background: theme.palette.background.paper,
            backgroundImage: 'none',
          }
        }}
      >
        {selectedProject && (
          <>
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              pb: 1
            }}>
              <Typography variant="h5" component="div" fontWeight={600}>
                {selectedProject.title}
              </Typography>
              <IconButton edge="end" color="inherit" onClick={handleCloseProject} aria-label="close">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box>
                {/* Project Image */}
                <Box 
                  sx={{ 
                    height: 300, 
                    bgcolor: 'grey.200',
                    borderRadius: 2,
                    mb: 3,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Box
                    component="img"
                    src={selectedProject.image || "https://source.unsplash.com/random/1200x600/?tech"}
                    alt={selectedProject.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      p: 2,
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 1,
                    }}
                  >
                    {selectedProject.githubUrl && (
                      <IconButton 
                        aria-label="github repository"
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'white',
                          bgcolor: 'rgba(0,0,0,0.3)',
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
                        }}
                      >
                        <GitHubIcon />
                      </IconButton>
                    )}
                    {selectedProject.demoUrl && (
                      <IconButton 
                        aria-label="live demo"
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'white',
                          bgcolor: 'rgba(0,0,0,0.3)',
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
                        }}
                      >
                        <LaunchIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>

                {/* Project Description */}
                <Typography variant="body1" paragraph>
                  {selectedProject.longDescription}
                </Typography>

                {/* Technologies */}
                <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
                  Technologies Used
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {selectedProject.technologies.map((tech) => (
                    <Chip 
                      key={tech} 
                      label={tech} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  ))}
                </Box>

                {/* Features */}
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Key Features
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  {selectedProject.features.map((feature, index) => (
                    <Typography component="li" key={index} paragraph>
                      {feature}
                    </Typography>
                  ))}
                </Box>

                {/* Actions */}
                <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
                  {selectedProject.githubUrl && (
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<GitHubIcon />}
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </Button>
                  )}
                  {selectedProject.demoUrl && (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<LaunchIcon />}
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </Button>
                  )}
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}

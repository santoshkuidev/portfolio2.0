'use client';

import React, { useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  useTheme,
  Fade,
  Zoom
} from '@mui/material';


// Icons
import { 
  FaReact, 
  FaAngular, 
  FaNodeJs, 
  FaAws, 
  FaFigma, 
  FaDocker 
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiMui, 
  SiThreedotjs, 
  SiGraphql, 
  SiFirebase 
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  category: 'frontend' | 'backend' | 'design' | 'other';
  level: number; // 1-5
}

export default function SkillsSection() {
  const theme = useTheme();
  
  const skills: Skill[] = [
    { 
      name: 'React', 
      icon: <FaReact size={40} />, 
      color: '#61DAFB', 
      category: 'frontend',
      level: 5
    },
    { 
      name: 'Angular', 
      icon: <FaAngular size={40} />, 
      color: '#DD0031', 
      category: 'frontend',
      level: 4
    },
    { 
      name: 'TypeScript', 
      icon: <SiTypescript size={40} />, 
      color: '#3178C6', 
      category: 'frontend',
      level: 5
    },
    { 
      name: 'Next.js', 
      icon: <SiNextdotjs size={40} />, 
      color: '#000000', 
      category: 'frontend',
      level: 5
    },
    { 
      name: 'Material UI', 
      icon: <SiMui size={40} />, 
      color: '#0081CB', 
      category: 'frontend',
      level: 5
    },
    { 
      name: 'Three.js', 
      icon: <SiThreedotjs size={40} />, 
      color: '#000000', 
      category: 'frontend',
      level: 4
    },
    { 
      name: 'Node.js', 
      icon: <FaNodeJs size={40} />, 
      color: '#339933', 
      category: 'backend',
      level: 4
    },
    { 
      name: 'GraphQL', 
      icon: <SiGraphql size={40} />, 
      color: '#E10098', 
      category: 'backend',
      level: 4
    },
    { 
      name: 'Firebase', 
      icon: <SiFirebase size={40} />, 
      color: '#FFCA28', 
      category: 'backend',
      level: 4
    },
    { 
      name: 'AWS', 
      icon: <FaAws size={40} />, 
      color: '#FF9900', 
      category: 'backend',
      level: 3
    },
    { 
      name: 'Docker', 
      icon: <FaDocker size={40} />, 
      color: '#2496ED', 
      category: 'other',
      level: 3
    },
    { 
      name: 'Figma', 
      icon: <FaFigma size={40} />, 
      color: '#F24E1E', 
      category: 'design',
      level: 4
    },
  ];

  return (
    <Box 
      id="skills"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          opacity: 0.05,
          background: theme.palette.mode === 'dark'
            ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            MY EXPERTISE
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Technical Skills
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mb: 2,
            }}
          >
            I specialize in modern web technologies and frameworks, creating responsive and interactive user experiences with a focus on performance and accessibility.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={skill.name}>
              <SkillCard skill={skill} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function SkillCard({ skill, index }: { skill: Skill, index: number }) {
  const theme = useTheme();

  // Calculate level bars
  const levelBars = [];
  for (let i = 0; i < 5; i++) {
    levelBars.push(
      <Box
        key={i}
        sx={{
          height: 4,
          width: 16,
          borderRadius: 2,
          backgroundColor: i < skill.level 
            ? skill.color 
            : theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)',
          mr: 0.5,
        }}
      />
    );
  }

  return (
    <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
      <Box
        sx={{
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
          },
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            height: '100%',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.05)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.paper} 100%)`,
              opacity: 0.7,
              zIndex: -1,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: -100,
              left: -100,
              width: 120,
              height: 120,
              background: skill.color,
              borderRadius: '50%',
              filter: 'blur(80px)',
              opacity: 0.15,
              zIndex: -1,
              transition: 'all 0.5s ease',
            },
            '&:hover::after': {
              opacity: 0.25,
              transform: 'scale(1.5)',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  color: skill.color,
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  borderRadius: '12px',
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.03)',
                  backdropFilter: 'blur(5px)',
                }}
              >
                {skill.icon}
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  {skill.name}
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  {levelBars}
                </Box>
              </Box>
            </Box>
            
            <Box
              sx={{
                mt: 'auto',
                pt: 2,
                borderTop: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  letterSpacing: 0.5,
                }}
              >
                {skill.category}
              </Typography>
              
              <Typography
                variant="caption"
                sx={{
                  color: skill.color,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                {skill.level === 5 ? 'Expert' : 
                  skill.level === 4 ? 'Advanced' : 
                  skill.level === 3 ? 'Intermediate' : 
                  'Beginner'}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Zoom>
  );
}

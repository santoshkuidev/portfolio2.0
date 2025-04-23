'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  useTheme,
  Snackbar,
  Alert,
  IconButton,
  Link
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { contactInfo } from '../contactInfo';

export default function ContactSection() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: formData.message.trim() === '',
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Using the Vercel-deployed API endpoint
        const res = await fetch('https://contact-api-two-cyan.vercel.app/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.ok) {
          setSnackbar({
            open: true,
            message: "Message sent successfully! I'll get back to you soon.",
            severity: 'success',
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          setSnackbar({
            open: true,
            message: 'Failed to send message. Please try again later.',
            severity: 'error',
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to send message. Please try again later.',
          severity: 'error',
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields correctly.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const contactDetails = [
    {
      icon: <EmailIcon />,
      title: 'Email',
      content: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
    },
    // Location can be added to contactInfo if desired
    // {
    //   icon: <LocationOnIcon />,
    //   title: 'Location',
    //   content: contactInfo.location,
    //   link: undefined,
    // },
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      content: contactInfo.phone,
      link: `tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`,

    },
  ];

  const socialLinks = [
    {
      icon: <GitHubIcon />,
      name: 'GitHub',
      link: contactInfo.github,
    },
    {
      icon: <LinkedInIcon />,
      name: 'LinkedIn',
      link: contactInfo.linkedin,
    },
  ];

  return (
    <Box 
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.8) 100%)'
          : 'linear-gradient(180deg, rgba(248, 250, 252, 0) 0%, rgba(248, 250, 252, 0.8) 100%)',
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${theme.palette.mode === 'dark' ? '%23FFFFFF' : '%23000000'}' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            GET IN TOUCH
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Let's Work Together
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
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
            Fill out the form below and I'll get back to you as soon as possible.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 4,
                maxWidth: 420,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 480,
              }}
            >
              <Typography variant="h5" component="h3" fontWeight={600} gutterBottom align="center">
                Send Me a Message
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, width: '100%' }}>
                <TextField
                  required
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  helperText={errors.name ? 'Name is required' : ''}
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  helperText={errors.email ? 'Valid email is required' : ''}
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
                <TextField
                  required
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  helperText={errors.message ? 'Message is required' : ''}
                  variant="outlined"
                  sx={{ mb: 4 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{
                      py: 1.5,
                      px: 3,
                      borderRadius: 2,
                      fontWeight: 600,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transition: 'all 0.6s ease',
                      },
                      '&:hover::before': {
                        left: '100%',
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  mb: 3,
                  flex: 1,
                }}
              >
                <Typography variant="h5" component="h3" fontWeight={600} gutterBottom>
                  Contact Information
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Feel free to reach out through any of the following methods:
                </Typography>
                <Box sx={{ mt: 3 }}>
                  {contactDetails.map((info, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        >
                          {info.icon}
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {info.title}
                          </Typography>
                          {info.link ? (
                            <Link
                              href={info.link}
                              color="inherit"
                              underline="hover"
                              sx={{
                                color: theme.palette.text.secondary,
                                '&:hover': {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            >
                              {info.content}
                            </Link>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              {info.content}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>

                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                  }}
                >
                  <Typography variant="h5" component="h3" fontWeight={600} gutterBottom>
                    Connect With Me
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    Follow me on social media to see my latest updates and projects:
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      mt: 3,
                    }}
                  >
                    {socialLinks.map((social, index) => (
                      <IconButton
                        key={index}
                        component="a"
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.03)',
                          color: theme.palette.text.secondary,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: theme.palette.mode === 'dark'
                              ? 'linear-gradient(90deg, #38bdf8, #818cf8)'
                              : 'linear-gradient(90deg, #3a86ff, #8b5cf6)',
                            color: 'white',
                            transform: 'translateY(-3px)',
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

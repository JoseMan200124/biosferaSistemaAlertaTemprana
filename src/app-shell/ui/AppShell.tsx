'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

import { Sidebar } from '@/app-shell/ui/Sidebar';
import { TopBar } from '@/app-shell/ui/TopBar';

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <TopBar />

      <IconButton
        onClick={() => setMobileOpen(true)}
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: 1400,
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <MenuIcon />
      </IconButton>

      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          px: {
            xs: 1.5, // mobile
            sm: 2, // tablet vertical
            md: 3, // desktop
          },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar />

        <Box sx={{ flexGrow: 1 }}>{children}</Box>

        <Box
          component="footer"
          sx={{
            mt: 4,
            py: 2,
            textAlign: 'center',
            borderTop: '1px solid #E5E7EB',
          }}
        >
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            © 2026 Biosfera Sistema de alertas tempranas • Guatemala
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

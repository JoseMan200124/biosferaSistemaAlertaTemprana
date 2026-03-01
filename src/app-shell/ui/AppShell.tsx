'use client';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Sidebar } from '@/app-shell/ui/Sidebar';
import { TopBar } from '@/app-shell/ui/TopBar';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <TopBar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, px: 2 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

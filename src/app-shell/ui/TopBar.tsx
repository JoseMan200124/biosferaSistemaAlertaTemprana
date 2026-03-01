'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function TopBar() {
  return (
    <AppBar position="fixed" elevation={0} color="transparent">
      <Toolbar sx={{ backdropFilter: 'blur(10px)' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
          Alertas Tempranas
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

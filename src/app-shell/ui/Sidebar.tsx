'use client';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import WarningIcon from '@mui/icons-material/Warning';
import PlaceIcon from '@mui/icons-material/Place';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/shared/config/routes';

const drawerWidth = 260;

export function Sidebar() {
  const pathname = usePathname();

  const items = [
    { href: routes.dashboard, label: 'Dashboard', icon: <DashboardIcon /> },
    { href: routes.forecast, label: 'Pronóstico', icon: <TimelineIcon /> },
    { href: routes.alerts, label: 'Alertas', icon: <WarningIcon /> },
    { href: routes.stations, label: 'Estaciones', icon: <PlaceIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(255,255,255,0.08)',
        },
      }}
    >
      <List sx={{ pt: 10 }}>
        {items.map((it) => (
          <ListItemButton
            key={it.href}
            component={Link}
            href={it.href}
            selected={pathname?.startsWith(it.href)}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{it.icon}</ListItemIcon>
            <ListItemText primary={it.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

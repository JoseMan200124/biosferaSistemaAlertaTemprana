'use client';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import WarningIcon from '@mui/icons-material/Warning';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/shared/config/routes';

const drawerWidth = 260;

type SidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  const items = [
    { href: routes.dashboard, label: 'Dashboard', icon: <DashboardIcon /> },
    { href: routes.forecast, label: 'Pronóstico', icon: <TimelineIcon /> },
    { href: routes.alerts, label: 'Alertas', icon: <WarningIcon /> },
  ];

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        {items.map((it) => (
          <ListItemButton
            key={it.href}
            component={Link}
            href={it.href}
            selected={pathname?.startsWith(it.href)}
            onClick={onMobileClose}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{it.icon}</ListItemIcon>
            <ListItemText primary={it.label} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <>
      {/* Mobile y tablet vertical */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(255,255,255,0.08)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

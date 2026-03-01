'use client';

import Container from '@mui/material/Container';
import { SectionTitle } from '@/shared/ui';
import { DashboardGrid } from '@/widgets/dashboard';

export function DashboardPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <SectionTitle>Dashboard</SectionTitle>
      <DashboardGrid />
    </Container>
  );
}

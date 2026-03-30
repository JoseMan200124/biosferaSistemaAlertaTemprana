// Se ajusto el titulo y el espaciado general de la pagina
// para reflejar mejor el diseño aprobado del dashboard.
'use client';

import Container from '@mui/material/Container';
import { SectionTitle } from '@/shared/ui';
import { DashboardGrid } from '@/widgets/dashboard';

export function DashboardPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <SectionTitle>Sistema de Monitoreo Climático</SectionTitle>
      <DashboardGrid />
    </Container>
  );
}

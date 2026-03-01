'use client';

import Container from '@mui/material/Container';
import { SectionTitle } from '@/shared/ui';
import { AlertsPanel } from '@/features/alerts-panel';

export function AlertsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <SectionTitle>Alertas</SectionTitle>
      <AlertsPanel />
    </Container>
  );
}

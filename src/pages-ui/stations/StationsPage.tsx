'use client';

import Container from '@mui/material/Container';
import { SectionTitle } from '@/shared/ui';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import { useStations } from '@/features/stations-selector/api/useStations';

export function StationsPage() {
  const q = useStations();

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <SectionTitle>Estaciones</SectionTitle>

      {q.isLoading && (
        <>
          <Skeleton height={44} />
          <Skeleton height={44} />
          <Skeleton height={44} />
        </>
      )}

      {q.isError && <Alert severity="error">No se pudieron cargar estaciones.</Alert>}

      {q.data && (
        <List>
          {q.data.map((s) => (
            <ListItemButton key={s.id} component={Link} href={`/stations/${s.id}`}>
              <ListItemText primary={s.name} secondary={`${s.lat}, ${s.lon}`} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Container>
  );
}

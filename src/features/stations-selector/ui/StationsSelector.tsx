'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import { useStations } from '@/features/stations-selector/api/useStations';

export function StationsSelector({
  value,
  onChange,
}: {
  value?: string;
  onChange: (id?: string) => void;
}) {
  const q = useStations();

  if (q.isLoading) return <Skeleton height={56} />;
  if (q.isError) return <Alert severity="error">No se pudieron cargar estaciones.</Alert>;

  const handleChange = (e: SelectChangeEvent) => {
    const v = e.target.value;
    onChange(v ? String(v) : undefined);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="station-label">Estación</InputLabel>
      <Select
        labelId="station-label"
        label="Estación"
        value={value ?? ''}
        onChange={handleChange}
      >
        <MenuItem value="">Todas</MenuItem>
        {q.data?.map((s) => (
          <MenuItem key={s.id} value={s.id}>
            {s.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

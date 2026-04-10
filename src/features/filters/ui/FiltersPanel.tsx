'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { locationOptions, useLocationStore } from '@/shared/store/useLocationStore';

export function FiltersPanel() {
  const { selectedLocation, setSelectedLocation } = useLocationStore();

  const handleLocationChange = (municipio: string) => {
    const found = locationOptions.find((item) => item.municipio === municipio);
    if (found) {
      setSelectedLocation(found);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        border: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="h6"
          sx={{
            color: '#184A72',
            fontWeight: 800,
            mb: 2,
          }}
        >
          Filtros
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          Selección dinámica de ubicación activa.
        </Alert>

        <Stack spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Zona</InputLabel>
            <Select
              label="Zona"
              value={selectedLocation.zona}
              sx={{
                borderRadius: 2,
                backgroundColor: '#FFFFFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E5E7EB',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3FADBA',
                },
              }}
              readOnly
            >
              {locationOptions.map((item) => (
                <MenuItem key={item.municipio} value={item.zona}>
                  {item.zona}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Departamento</InputLabel>
            <Select
              label="Departamento"
              value={selectedLocation.departamento}
              sx={{
                borderRadius: 2,
                backgroundColor: '#FFFFFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E5E7EB',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3FADBA',
                },
              }}
              readOnly
            >
              {locationOptions.map((item) => (
                <MenuItem key={item.municipio} value={item.departamento}>
                  {item.departamento}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Municipio</InputLabel>
            <Select
              label="Municipio"
              value={selectedLocation.municipio}
              onChange={(e) => handleLocationChange(e.target.value)}
              sx={{
                borderRadius: 2,
                backgroundColor: '#FFFFFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E5E7EB',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3FADBA',
                },
              }}
            >
              {locationOptions.map((item) => (
                <MenuItem key={item.municipio} value={item.municipio}>
                  {item.municipio}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider sx={{ my: 1 }} />

          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#184A72',
                fontWeight: 700,
                mb: 1,
              }}
            >
              Capas del mapa
            </Typography>

            <Stack spacing={0.5}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      color: '#3FADBA',
                      transition: 'all 0.2s ease',
                      '&.Mui-checked': {
                        color: '#3FADBA',
                      },
                    }}
                  />
                }
                label="Temperatura"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      color: '#3FADBA',
                      transition: 'all 0.2s ease',
                      '&.Mui-checked': {
                        color: '#3FADBA',
                      },
                    }}
                  />
                }
                label="Lluvia"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      color: '#3FADBA',
                      transition: 'all 0.2s ease',
                      '&.Mui-checked': {
                        color: '#3FADBA',
                      },
                    }}
                  />
                }
                label="Viento"
              />
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

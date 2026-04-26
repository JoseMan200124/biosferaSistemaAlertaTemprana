'use client';

import { useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { locationOptions, useLocationStore } from '@/shared/store/useLocationStore';

export function FiltersPanel() {
  const { selectedLocation, setSelectedLocation, activeLayer, setActiveLayer } = useLocationStore();

  const departamentos = useMemo(() => {
    return [...new Set(locationOptions.map((item) => item.departamento))].sort((a, b) =>
      a.localeCompare(b, 'es'),
    );
  }, []);

  const municipios = useMemo(() => {
    return locationOptions
      .filter((item) => item.departamento === selectedLocation.departamento)
      .sort((a, b) => a.municipio.localeCompare(b.municipio, 'es'));
  }, [selectedLocation.departamento]);

  const handleDepartamentoChange = (departamento: string) => {
    const firstMunicipio = locationOptions
      .filter((item) => item.departamento === departamento)
      .sort((a, b) => a.municipio.localeCompare(b.municipio, 'es'))[0];

    if (firstMunicipio) {
      setSelectedLocation(firstMunicipio);
    }
  };

  const handleMunicipioChange = (municipio: string) => {
    const found = locationOptions.find(
      (item) => item.departamento === selectedLocation.departamento && item.municipio === municipio,
    );

    if (found) {
      setSelectedLocation(found);
    }
  };

  const handleLayerToggle = (layer: 'temperature' | 'rain' | 'wind') => {
    if (activeLayer === layer) {
      setActiveLayer(null);
      return;
    }

    setActiveLayer(layer);
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
          Selecciona ubicación para actualizar datos y mapa.
        </Alert>

        <Stack spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Departamento</InputLabel>
            <Select
              value={selectedLocation.departamento}
              label="Departamento"
              onChange={(e) => handleDepartamentoChange(e.target.value)}
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
              {departamentos.map((dep) => (
                <MenuItem key={dep} value={dep}>
                  {dep}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Municipio</InputLabel>
            <Select
              value={selectedLocation.municipio}
              label="Municipio"
              onChange={(e) => handleMunicipioChange(e.target.value)}
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
              {municipios.map((item) => (
                <MenuItem key={`${item.departamento}-${item.municipio}`} value={item.municipio}>
                  {item.municipio}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#6B7280',
                mb: 0.5,
                fontWeight: 600,
              }}
            >
              Zona
            </Typography>

            <Box
              sx={{
                px: 2,
                py: 1.4,
                borderRadius: 2,
                border: '1px solid #E5E7EB',
                backgroundColor: '#F8FAFC',
                color: '#184A72',
                fontWeight: 600,
              }}
            >
              {selectedLocation.zona}
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: '#184A72',
                mb: 1,
              }}
            >
              Capas del mapa
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: '#6B7280',
                mb: 1,
              }}
            >
              Solo una capa climática puede estar activa a la vez.
            </Typography>

            <Stack spacing={0.5}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={activeLayer === 'temperature'}
                    onChange={() => handleLayerToggle('temperature')}
                    sx={{
                      color: '#3FADBA',
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
                    checked={activeLayer === 'rain'}
                    onChange={() => handleLayerToggle('rain')}
                    sx={{
                      color: '#3FADBA',
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
                    checked={activeLayer === 'wind'}
                    onChange={() => handleLayerToggle('wind')}
                    sx={{
                      color: '#3FADBA',
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

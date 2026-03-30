// Panel de filtros maquetado con selects y checkboxes.
// Actualmente usa opciones mock para avanzar la UI.
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

export function FiltersPanel() {
  const hasApiError = true;

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

        {hasApiError && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Mostrando filtros de prueba.
          </Alert>
        )}

        <Stack spacing={2}>
          {/* Zona */}
          <FormControl fullWidth size="small">
            <InputLabel>Zona</InputLabel>
            <Select
              label="Zona"
              defaultValue="zona-centro"
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
              <MenuItem value="zona-centro">Zona Centro</MenuItem>
              <MenuItem value="zona-norte">Zona Norte</MenuItem>
              <MenuItem value="zona-sur">Zona Sur</MenuItem>
            </Select>
          </FormControl>

          {/* Departamento */}
          <FormControl fullWidth size="small">
            <InputLabel>Departamento</InputLabel>
            <Select
              label="Departamento"
              defaultValue="guatemala"
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
              <MenuItem value="guatemala">Guatemala</MenuItem>
              <MenuItem value="sacatepequez">Sacatepéquez</MenuItem>
              <MenuItem value="escuintla">Escuintla</MenuItem>
            </Select>
          </FormControl>

          {/* Municipio */}
          <FormControl fullWidth size="small">
            <InputLabel>Municipio</InputLabel>
            <Select
              label="Municipio"
              defaultValue="guatemala-city"
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
              <MenuItem value="guatemala-city">Guatemala</MenuItem>
              <MenuItem value="mixco">Mixco</MenuItem>
              <MenuItem value="villa-nueva">Villa Nueva</MenuItem>
            </Select>
          </FormControl>

          <Divider sx={{ my: 1 }} />

          {/* Capas */}
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

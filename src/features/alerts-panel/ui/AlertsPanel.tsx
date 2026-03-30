// Panel de alertas rediseñado con estilos por nivel y datos mock
// para mantener consistencia visual durante desarrollo.

'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import AirRoundedIcon from '@mui/icons-material/AirRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';

type AlertItem = {
  id: string;
  title: string;
  description: string;
  level: 'high' | 'medium' | 'low';
  type: 'rain' | 'wind' | 'fire';
};

const mockAlerts: AlertItem[] = [
  {
    id: '1',
    title: 'Lluvia fuerte',
    description: 'Precipitación intensa prevista para las próximas horas.',
    level: 'high',
    type: 'rain',
  },
  {
    id: '2',
    title: 'Viento',
    description: 'Ráfagas moderadas en la zona monitoreada.',
    level: 'medium',
    type: 'wind',
  },
  {
    id: '3',
    title: 'Fuego',
    description: 'Posible punto de calor detectado en área cercana.',
    level: 'high',
    type: 'fire',
  },
];

function getAlertStyles(level: AlertItem['level']) {
  switch (level) {
    case 'high':
      return {
        bg: '#FEF2F2',
        border: '#FECACA',
        title: '#B91C1C',
      };
    case 'medium':
      return {
        bg: '#FFF7ED',
        border: '#FED7AA',
        title: '#C2410C',
      };
    case 'low':
    default:
      return {
        bg: '#EFF6FF',
        border: '#BFDBFE',
        title: '#1D4ED8',
      };
  }
}

function getAlertIcon(type: AlertItem['type']) {
  switch (type) {
    case 'rain':
      return <WarningAmberRoundedIcon sx={{ color: '#B91C1C' }} />;
    case 'wind':
      return <AirRoundedIcon sx={{ color: '#C2410C' }} />;
    case 'fire':
      return <LocalFireDepartmentRoundedIcon sx={{ color: '#B91C1C' }} />;
    default:
      return <WarningAmberRoundedIcon sx={{ color: '#184A72' }} />;
  }
}

export function AlertsPanel() {
  const hasApiError = true;
  const alertsToRender = mockAlerts;

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
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
          Alertas
        </Typography>

        {hasApiError && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Mostrando alertas de prueba.
          </Alert>
        )}

        <Stack spacing={1.5}>
          {alertsToRender.map((alertItem) => {
            const styles = getAlertStyles(alertItem.level);

            return (
              <Box
                key={alertItem.id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  p: 1.75,
                  borderRadius: 2,
                  backgroundColor: styles.bg,
                  border: `1px solid ${styles.border}`,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <Box
                  sx={{
                    mt: 0.2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getAlertIcon(alertItem.type)}
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: styles.title,
                      lineHeight: 1.2,
                    }}
                  >
                    {alertItem.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#35566E',
                      mt: 0.4,
                    }}
                  >
                    {alertItem.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}

import Typography from '@mui/material/Typography';

export function SectionTitle({ children }: { children: string }) {
  return (
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
      {children}
    </Typography>
  );
}

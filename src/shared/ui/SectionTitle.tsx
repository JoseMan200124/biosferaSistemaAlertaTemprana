import Typography from '@mui/material/Typography';

export function SectionTitle({ children }: { children: string }) {
  return (
    <Typography
      variant="h5"
      sx={{
        fontWeight: 800,
        mb: 2,
        color: '#184A72',
      }}
    >
      {children}
    </Typography>
  );
}

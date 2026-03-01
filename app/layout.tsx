import type { ReactNode } from 'react';
import { Providers, AppShell } from '@/app-shell';

export const metadata = {
  title: 'Alertas Tempranas',
  description: 'Dashboard de monitoreo y alertas',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}

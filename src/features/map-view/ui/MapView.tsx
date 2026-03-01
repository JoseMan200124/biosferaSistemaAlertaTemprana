'use client';

import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import '@arcgis/core/assets/esri/themes/dark/main.css';

export function MapView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!ref.current || viewRef.current) return;

      try {
        const [{ default: ArcGISMap }, { default: MapView }] = await Promise.all([
          import('@arcgis/core/Map'),
          import('@arcgis/core/views/MapView'),
        ]);

        if (cancelled || !ref.current) return;

        const map = new ArcGISMap({ basemap: 'dark-gray-vector' });

        const view = new MapView({
          container: ref.current,
          map,
          center: [-90.5133, 14.6407],
          zoom: 10,
        });

        viewRef.current = view;
      } catch (e) {
        viewRef.current = 'error';
      }
    }

    init();

    return () => {
      cancelled = true;
      const v = viewRef.current;
      if (v && v.destroy) v.destroy();
      viewRef.current = null;
    };
  }, []);

  if (viewRef.current === 'error') return <Alert severity="error">No se pudo cargar el mapa.</Alert>;

  return <Box ref={ref} sx={{ height: 420, width: '100%', borderRadius: 2, overflow: 'hidden' }} />;
}

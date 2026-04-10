'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
//import '@arcgis/core/assets/esri/themes/dark/main.css';

import { useLocationStore } from '@/shared/store/useLocationStore';

export function MapView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<any>(null);
  const graphicRef = useRef<any>(null);

  const { selectedLocation } = useLocationStore();

  const [mapError, setMapError] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!ref.current || viewRef.current) return;

      try {
        const [{ default: ArcGISMap }, { default: MapView }, { default: Graphic }] =
          await Promise.all([
            import('@arcgis/core/Map'),
            import('@arcgis/core/views/MapView'),
            import('@arcgis/core/Graphic'),
          ]);

        if (cancelled || !ref.current) return;

        const map = new ArcGISMap({
          basemap: 'dark-gray-vector',
        });

        const view = new MapView({
          container: ref.current,
          map,
          center: [selectedLocation.lon, selectedLocation.lat],
          zoom: 10,
          ui: {
            components: ['zoom'],
          },
        });

        await view.when();

        const pointGraphic = new Graphic({
          geometry: {
            type: 'point',
            longitude: selectedLocation.lon,
            latitude: selectedLocation.lat,
          },
          symbol: {
            type: 'simple-marker',
            color: '#3FADBA',
            size: 12,
            outline: {
              color: '#FFFFFF',
              width: 2,
            },
          },
          attributes: {
            municipio: selectedLocation.municipio,
            departamento: selectedLocation.departamento,
          },
          popupTemplate: {
            title: '{municipio}',
            content: '{departamento}',
          },
        });

        view.graphics.add(pointGraphic);

        graphicRef.current = pointGraphic;
        viewRef.current = view;
        setMapReady(true);
      } catch (error) {
        console.error('Error al cargar el mapa:', error);
        setMapError(true);
      }
    }

    init();

    return () => {
      cancelled = true;
      const view = viewRef.current;
      if (view && view.destroy) view.destroy();
      viewRef.current = null;
      graphicRef.current = null;
    };
  }, []);

  useEffect(() => {
    async function updateMapLocation() {
      if (!viewRef.current || !graphicRef.current || mapError) return;

      try {
        const view = viewRef.current;
        const graphic = graphicRef.current;

        graphic.geometry = {
          type: 'point',
          longitude: selectedLocation.lon,
          latitude: selectedLocation.lat,
        };

        graphic.attributes = {
          municipio: selectedLocation.municipio,
          departamento: selectedLocation.departamento,
        };

        await view.goTo(
          {
            center: [selectedLocation.lon, selectedLocation.lat],
            zoom: 10,
          },
          {
            duration: 1200,
          },
        );
      } catch (error) {
        console.error('Error al actualizar ubicación del mapa:', error);
      }
    }

    updateMapLocation();
  }, [selectedLocation, mapError]);

  if (mapError) {
    return <Alert severity="error">No se pudo cargar el mapa.</Alert>;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: 420,
        width: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        '&:hover': {
          borderColor: '#3FADBA',
        },
      }}
    >
      {!mapReady && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.04)',
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Box
        ref={ref}
        sx={{
          height: '100%',
          width: '100%',
        }}
      />
    </Box>
  );
}

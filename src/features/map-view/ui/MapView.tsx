'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocationStore } from '@/shared/store/useLocationStore';

export function MapView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<any>(null);
  const pointGraphicRef = useRef<any>(null);
  const circleGraphicRef = useRef<any>(null);

  const { selectedLocation, activeLayer } = useLocationStore();

  const [mapError, setMapError] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!ref.current || viewRef.current) return;

      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

        if (!apiKey) {
          throw new Error('Falta NEXT_PUBLIC_OPENWEATHER_API_KEY en .env.local');
        }

        const [
          { default: ArcGISMap },
          { default: MapView },
          { default: Graphic },
          { default: WebTileLayer },
        ] = await Promise.all([
          import('@arcgis/core/Map'),
          import('@arcgis/core/views/MapView'),
          import('@arcgis/core/Graphic'),
          import('@arcgis/core/layers/WebTileLayer'),
        ]);

        if (cancelled || !ref.current) return;

        const map = new ArcGISMap({
          basemap: 'dark-gray-vector',
        });

        const temperatureLayer = new WebTileLayer({
          urlTemplate: `https://tile.openweathermap.org/map/temp_new/{level}/{col}/{row}.png?appid=${apiKey}`,
          opacity: 0.75,
          visible: activeLayer === 'temperature',
        });

        const rainLayer = new WebTileLayer({
          urlTemplate: `https://tile.openweathermap.org/map/precipitation_new/{level}/{col}/{row}.png?appid=${apiKey}`,
          opacity: 0.9,
          visible: activeLayer === 'rain',
        });

        const windLayer = new WebTileLayer({
          urlTemplate: `https://tile.openweathermap.org/map/wind_new/{level}/{col}/{row}.png?appid=${apiKey}`,
          opacity: 1,
          visible: activeLayer === 'wind',
        });

        map.addMany([temperatureLayer, rainLayer, windLayer]);

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
            style: 'circle',
            color: '#3FADBA',
            size: 14,
            outline: {
              color: '#FFFFFF',
              width: 2,
            },
          },
          attributes: {
            municipio: selectedLocation.municipio,
            departamento: selectedLocation.departamento,
            zona: selectedLocation.zona,
          },
          popupTemplate: {
            title: '{municipio}',
            content: '<b>Departamento:</b> {departamento}<br/><b>Zona:</b> {zona}',
          },
        });

        const circleGraphic = new Graphic({
          geometry: {
            type: 'point',
            longitude: selectedLocation.lon,
            latitude: selectedLocation.lat,
          },
          symbol: {
            type: 'simple-marker',
            style: 'circle',
            color: [63, 173, 186, 0.16],
            size: 40,
            outline: {
              color: '#3FADBA',
              width: 1,
            },
          },
        });

        view.graphics.addMany([circleGraphic, pointGraphic]);

        pointGraphicRef.current = pointGraphic;
        circleGraphicRef.current = circleGraphic;
        viewRef.current = {
          view,
          temperatureLayer,
          rainLayer,
          windLayer,
        };

        setMapReady(true);
      } catch (error) {
        console.error('Error al cargar el mapa:', error);
        setMapError(true);
      }
    }

    init();

    return () => {
      cancelled = true;

      const current = viewRef.current;
      if (current?.view?.destroy) {
        current.view.destroy();
      }

      viewRef.current = null;
      pointGraphicRef.current = null;
      circleGraphicRef.current = null;
    };
  }, []);

  useEffect(() => {
    async function updateMapLocation() {
      if (!viewRef.current || !pointGraphicRef.current || !circleGraphicRef.current || mapError) {
        return;
      }

      try {
        const { view } = viewRef.current;

        pointGraphicRef.current.geometry = {
          type: 'point',
          longitude: selectedLocation.lon,
          latitude: selectedLocation.lat,
        };

        pointGraphicRef.current.attributes = {
          municipio: selectedLocation.municipio,
          departamento: selectedLocation.departamento,
          zona: selectedLocation.zona,
        };

        circleGraphicRef.current.geometry = {
          type: 'point',
          longitude: selectedLocation.lon,
          latitude: selectedLocation.lat,
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

  useEffect(() => {
    if (!viewRef.current || mapError) return;

    const { temperatureLayer, rainLayer, windLayer } = viewRef.current;

    if (temperatureLayer) {
      temperatureLayer.visible = activeLayer === 'temperature';
    }

    if (rainLayer) {
      rainLayer.visible = activeLayer === 'rain';
    }

    if (windLayer) {
      windLayer.visible = activeLayer === 'wind';
    }
  }, [activeLayer, mapError]);

  const activeLayerLabel =
    activeLayer === 'temperature'
      ? 'Temperatura'
      : activeLayer === 'rain'
        ? 'Lluvia'
        : activeLayer === 'wind'
          ? 'Viento'
          : 'Ninguna';

  if (mapError) {
    return <Alert severity="error">No se pudo cargar el mapa.</Alert>;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: {
          xs: 280, // mobile
          sm: 340, // tablet vertical
          md: 420, // desktop
        },
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
            zIndex: 2,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {mapReady && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 2,
            px: 1.5,
            py: 0.8,
            borderRadius: 2,
            backgroundColor: 'rgba(15, 23, 42, 0.78)',
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 600,
            backdropFilter: 'blur(4px)',
          }}
        >
          Capa activa: {activeLayerLabel}
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

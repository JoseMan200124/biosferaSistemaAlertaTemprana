# Alertas Tempranas - Frontend

Frontend Web (Next.js + TypeScript) con arquitectura Feature-Sliced, orientado a dashboard de monitoreo y alertas.

## Requisitos
- Node 20

## Instalación
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build estático (para hosting en bucket)
```bash
npm run build
npm run export
```

Salida en `out/`.

## CI/CD
- `ci.yml`: lint + test + build
- `deploy-gcs-static.yml`: build + export + sync a Cloud Storage (GCS)

## Estructura (resumen)
- `app/`: rutas (Next App Router)
- `src/`: Feature-Sliced (shared/entities/features/widgets/pages-ui)

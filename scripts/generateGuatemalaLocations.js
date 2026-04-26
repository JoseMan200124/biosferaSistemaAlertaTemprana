const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../guatemala_lat_lon.csv');
const outputPath = path.join(__dirname, '../src/shared/data/guatemalaLocations.ts');

const zonesByDepartment = {
  Guatemala: 'Zona Centro',
  Sacatepéquez: 'Zona Centro',
  Chimaltenango: 'Zona Occidente',
  Escuintla: 'Zona Sur',
  'Santa Rosa': 'Zona Sur',
  Suchitepéquez: 'Zona Sur',
  Retalhuleu: 'Zona Sur',
  Quetzaltenango: 'Zona Occidente',
  'San Marcos': 'Zona Occidente',
  Huehuetenango: 'Zona Occidente',
  Totonicapán: 'Zona Occidente',
  Sololá: 'Zona Occidente',
  Quiché: 'Zona Occidente',
  'Alta Verapaz': 'Zona Norte',
  'Baja Verapaz': 'Zona Centro',
  Petén: 'Zona Petén',
  Izabal: 'Zona Caribe',
  Zacapa: 'Zona Oriente',
  Chiquimula: 'Zona Oriente',
  Jalapa: 'Zona Oriente',
  Jutiapa: 'Zona Oriente',
  'El Progreso': 'Zona Oriente',
};

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let insideQuotes = false;

  for (const char of line) {
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

const raw = fs.readFileSync(csvPath, 'utf8');
const lines = raw.trim().split(/\r?\n/);
const headers = parseCsvLine(lines[0]);

const getIndex = (name) => headers.indexOf(name);

const depIndex = getIndex('ADM1_ES');
const munIndex = getIndex('ADM2_ES');
const lonIndex = getIndex('x');
const latIndex = getIndex('y');

if (depIndex === -1 || munIndex === -1 || lonIndex === -1 || latIndex === -1) {
  throw new Error('No se encontraron las columnas necesarias: ADM1_ES, ADM2_ES, x, y');
}

const locations = lines
  .slice(1)
  .map((line) => {
    const columns = parseCsvLine(line);

    const departamento = columns[depIndex];
    const municipio = columns[munIndex];
    const lon = Number(columns[lonIndex]);
    const lat = Number(columns[latIndex]);

    if (!departamento || !municipio || Number.isNaN(lat) || Number.isNaN(lon)) {
      return null;
    }

    return {
      zona: zonesByDepartment[departamento] || 'Zona General',
      departamento,
      municipio,
      lat: Number(lat.toFixed(6)),
      lon: Number(lon.toFixed(6)),
    };
  })
  .filter(Boolean)
  .sort((a, b) => {
    const depCompare = a.departamento.localeCompare(b.departamento, 'es');
    if (depCompare !== 0) return depCompare;
    return a.municipio.localeCompare(b.municipio, 'es');
  });

const content = `export type GuatemalaLocation = {
  zona: string;
  departamento: string;
  municipio: string;
  lat: number;
  lon: number;
};

export const guatemalaLocations: GuatemalaLocation[] = ${JSON.stringify(locations, null, 2)};
`;

fs.writeFileSync(outputPath, content, 'utf8');

console.log('Archivo generado correctamente: ' + outputPath);
console.log('Municipios generados: ' + locations.length);

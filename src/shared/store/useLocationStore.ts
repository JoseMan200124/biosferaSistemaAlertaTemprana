import { create } from 'zustand';

type LocationOption = {
  zona: string;
  departamento: string;
  municipio: string;
  lat: number;
  lon: number;
};

type LocationStore = {
  selectedLocation: LocationOption;
  setSelectedLocation: (location: LocationOption) => void;
};

export const locationOptions: LocationOption[] = [
  {
    zona: 'Zona Centro',
    departamento: 'Francisco Morazán',
    municipio: 'Tegucigalpa',
    lat: 14.0723,
    lon: -87.1921,
  },
  {
    zona: 'Zona Norte',
    departamento: 'Cortés',
    municipio: 'San Pedro Sula',
    lat: 15.5042,
    lon: -88.025,
  },
  {
    zona: 'Zona Occidente',
    departamento: 'Quetzaltenango',
    municipio: 'Quetzaltenango',
    lat: 14.8347,
    lon: -91.5181,
  },
  {
    zona: 'Zona Oriente',
    departamento: 'Olancho',
    municipio: 'Juticalpa',
    lat: 14.6667,
    lon: -86.2167,
  },
];

export const useLocationStore = create<LocationStore>((set) => ({
  selectedLocation: locationOptions[0],
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));

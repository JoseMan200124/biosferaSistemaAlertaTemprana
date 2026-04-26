import { create } from 'zustand';
import { guatemalaLocations, type GuatemalaLocation } from '@/shared/Data/guatemalaLocations';

export type ActiveMapLayer = 'temperature' | 'rain' | 'wind' | null;

type LocationStore = {
  selectedLocation: GuatemalaLocation;
  setSelectedLocation: (location: GuatemalaLocation) => void;
  activeLayer: ActiveMapLayer;
  setActiveLayer: (layer: ActiveMapLayer) => void;
};

export const locationOptions = guatemalaLocations;

export const useLocationStore = create<LocationStore>((set) => ({
  selectedLocation: locationOptions[0],

  setSelectedLocation: (location) => set({ selectedLocation: location }),

  activeLayer: 'temperature',

  setActiveLayer: (layer) => set({ activeLayer: layer }),
}));

import { create } from 'zustand';

type FiltersState = {
  stationId?: string;
  setStationId: (id?: string) => void;
};

export const useFiltersStore = create<FiltersState>((set) => ({
  stationId: undefined,
  setStationId: (stationId) => set({ stationId }),
}));

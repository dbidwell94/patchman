import { atom, useAtom } from "jotai";

export interface Preferences {
  bodyBuilderSeperatorLocation: number;
  requestBuilderTabIndex: number;
  urlHistory: string[];
}

const initialPreferencesState: Preferences = {
  bodyBuilderSeperatorLocation: 25,
  requestBuilderTabIndex: 0,
  urlHistory: [],
};

export const preferencesAtom = atom<Preferences>(initialPreferencesState);

export function useAppPreferences() {
  return useAtom(preferencesAtom);
}

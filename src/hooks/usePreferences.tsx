import { PropsWithChildren, createContext, useState, useContext, Dispatch, SetStateAction } from "react";

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

const PreferencesContext = createContext<[Preferences, Dispatch<SetStateAction<Preferences>>]>([
  initialPreferencesState,
  () => {},
]);

export function useAppPreferences() {
  return useContext(PreferencesContext);
}

export default function PreferencesProvider(props: PropsWithChildren) {
  const preferencesState = useState<Preferences>(initialPreferencesState);

  return <PreferencesContext.Provider value={preferencesState}>{props.children}</PreferencesContext.Provider>;
}

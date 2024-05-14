import { PropsWithChildren, createContext, useState, useContext, Dispatch, SetStateAction } from "react";

export interface IPreferences {
  bodyBuilderSeparatorLocation: number;
  requestBuilderTabIndex: number;
  urlHistory: string[];
}

const initialPreferencesState: IPreferences = {
  bodyBuilderSeparatorLocation: 25,
  requestBuilderTabIndex: 0,
  urlHistory: [],
};

const PreferencesContext = createContext<[IPreferences, Dispatch<SetStateAction<IPreferences>>]>([
  initialPreferencesState,
  () => {},
]);

export function useAppPreferences() {
  return useContext(PreferencesContext);
}

export default function PreferencesProvider(props: PropsWithChildren) {
  const preferencesState = useState<IPreferences>(initialPreferencesState);

  return <PreferencesContext.Provider value={preferencesState}>{props.children}</PreferencesContext.Provider>;
}

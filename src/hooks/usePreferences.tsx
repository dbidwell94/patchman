import { createContext, ComponentChildren } from "preact";
import { useContext, useState, StateUpdater } from "preact/hooks";

export interface IPreferences {
  bodyBuilderSeperatorLocation: number;
  requestBuilderTabIndex: number;
  urlHistory: string[];
}

const initialPreferencesState: IPreferences = {
  bodyBuilderSeperatorLocation: 25,
  requestBuilderTabIndex: 0,
  urlHistory: [],
};

const PreferencesContext = createContext<[IPreferences, StateUpdater<IPreferences>]>([
  initialPreferencesState,
  () => {},
]);

export function useAppPreferences() {
  return useContext(PreferencesContext);
}

export default function PreferencesProvider(props: { children: ComponentChildren }) {
  const preferencesState = useState<IPreferences>(initialPreferencesState);

  return <PreferencesContext.Provider value={preferencesState}>{props.children}</PreferencesContext.Provider>;
}

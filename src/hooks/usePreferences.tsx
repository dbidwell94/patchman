import { useContext, createContext, PropsWithChildren, useState } from "react";

export interface IPreferences {
  bodyBuilderSeperatorLocation: number;
  requestBuilderTabIndex: number;
  urlHistory: string[];
}

const initialPreferencesState: IPreferences = {
  bodyBuilderSeperatorLocation: 25,
  requestBuilderTabIndex: 1,
  urlHistory: [],
};

const PreferencesContext = createContext<
  [IPreferences, React.Dispatch<React.SetStateAction<IPreferences>>]
>([initialPreferencesState, () => {}]);

export function useAppPreferences() {
  return useContext(PreferencesContext);
}

export default function PreferencesProvider(props: PropsWithChildren) {
  const preferencesState = useState<IPreferences>(initialPreferencesState);

  return (
    <PreferencesContext.Provider value={preferencesState}>
      {props.children}
    </PreferencesContext.Provider>
  );
}

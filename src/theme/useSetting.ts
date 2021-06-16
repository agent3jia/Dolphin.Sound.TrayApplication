import { useContext,createContext} from 'react';

const SettingsContext = createContext({});

export default function useSettings() {
  const context = useContext(SettingsContext);

  return context;
}
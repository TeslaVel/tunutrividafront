import { useContext } from 'react'
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { AuthContext } from '@/AuthProviderManager';

// types
import { SelectedPage, ThemeType } from "@/types";

type Props = {
  isLogged: boolean;
  theme: ThemeType | null
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage, center?: boolean) => void;
}

const Head: React.FC<Props> = ({isLogged, isTopOfPage, selectedPage, setSelectedPage, theme}: Props) => {
  // El early return estaba antes del useContext, violando las Rules of
  // Hooks (la cantidad de hooks llamados cambiaría entre renders según
  // theme). Ahora el hook siempre se llama, y el return va después.
  const { userStored, deleteUserStored} = useContext(AuthContext);
  if (!theme) return null
  return (
    isLogged
    ? <Sidebar
      theme={theme}
      userStored={userStored}
      deleteUserStored={deleteUserStored}
      selectedPage={selectedPage} />
    : <Navbar
      isTopOfPage={isTopOfPage}
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
    />
  );
};

export default Head;

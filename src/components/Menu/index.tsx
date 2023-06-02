import { useContext } from 'react'
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { SelectedPage } from "@/shared/types";
import { AuthContext } from '@/AuthProviderManager';

type Props = {
  isLogged: boolean;
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
}

const Menu = ({isLogged, isTopOfPage, selectedPage, setSelectedPage}: Props) => {
  const { userStored, deleteUserStored } = useContext(AuthContext);
  return (
    isLogged
    ? <Sidebar
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

export default Menu;

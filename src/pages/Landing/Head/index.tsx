import { useContext } from 'react'
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { AuthContext } from '@/AuthProviderManager';

// types
import { SelectedPage, UserColors } from "@/types";

type Props = {
  isLogged: boolean;
  userColors: UserColors | null
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage, center?: boolean) => void;
}

const Head: React.FC<Props> = ({isLogged, isTopOfPage, selectedPage, setSelectedPage, userColors}: Props) => {
  if (!userColors) return null
  const { userStored, deleteUserStored} = useContext(AuthContext);
  return (
    isLogged
    ? <Sidebar
      userColors={userColors}
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

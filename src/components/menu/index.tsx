import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { SelectedPage } from "@/shared/types";

type Props = {
  isLogged: boolean;
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
}

const Menu = ({isLogged, isTopOfPage, selectedPage, setSelectedPage}: Props) => {
  return (
    isLogged
    ? <Sidebar selectedPage={selectedPage} />
    : <Navbar
      isLogged={isLogged}
      isTopOfPage={isTopOfPage}
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
    />
  );
};

export default Menu;

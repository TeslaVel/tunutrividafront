import { useState, useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
// import Logo from "@/assets/Logo.png";
import Logo from "@/assets/ntv/logo_3.png";
import LinkAnchor from "../LinkAnchor";
// import Sidebar from "@/scenes/sidebar";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/shared/ActionButton";
import { AuthContext } from '@/AuthProviderManager';
import { Link } from "react-router-dom";

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const navbarBackground = isTopOfPage ? "" : "bg-primary-50 drop-shadow";

  const landingOptions = () => {
    return (
      <>
        <LinkAnchor
          page="Home"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <LinkAnchor
          page="Paquetes"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <LinkAnchor
          page="Tratamientos"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <LinkAnchor
          page="Contactanos"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      </>
    )
  }

  const landingMenu = () => {
    return (
      <>
        <div className={`${flexBetween} gap-8 text-sm`}>
          { landingOptions() }
        </div>
        <div className={`${flexBetween} gap-8`}>
          <ActionButton setSelectedPage={setSelectedPage} selectedPage={SelectedPage.LogIn}>
            Sign In
          </ActionButton>
          <ActionButton setSelectedPage={setSelectedPage} selectedPage={SelectedPage.Contactanos}>
            Become a Member
          </ActionButton>
        </div>
      </>
    )
  }
  const movilLandingMenu = () => landingOptions()


  return (
    <nav>
      <div
        className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-10`}>
            {/* LEFT SIDE */}
            <Link to='/'>
              <img alt="logo" src={Logo} style={{width: '200px', height: '51px'}} />
            </Link>

            {/* RIGHT SIDE */}
            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                { landingMenu() }
              </div>
            ) : (
              <button
                className="rounded-full bg-primary-300 p-2"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Bars3Icon className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled &&
        <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-50 drop-shadow-xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="ml-[33%] flex flex-col gap-10 text-2xl">
            { movilLandingMenu() }
          </div>
        </div>
      }
    </nav>
  );
};

export default Navbar;

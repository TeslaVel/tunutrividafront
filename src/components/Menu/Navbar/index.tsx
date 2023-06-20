import { useState, useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
// import Logo from "@/assets/Logo.png";
import Logo from "@/assets/ntv/logo_3.png";
import LinkAnchor from "@/components/Compound/Links/LinkAnchor";
import { SelectedPage } from "@/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/components/Compound/Buttons/ActionButton";
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
  const sameColor = 'bg-dark-purple-300'
  const navbarBackground = isTopOfPage ? "" : `${sameColor}`;

  const landingOptions = () => {
    const anchorBaseColor = isTopOfPage ? 'text-pink-100 hover:text-pink-400' : 'text-white hover:text-pink-30'
    const selectePageColor ='text-pink-30 hover:pink-50'
    return (
      <>
        <LinkAnchor
          page="Home"
          url="home"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          baseColor={anchorBaseColor}
          selectePageColor={selectePageColor}
        />
        <LinkAnchor
          page="Paquetes"
          url="packages"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          baseColor={anchorBaseColor}
          selectePageColor={selectePageColor}
        />
        <LinkAnchor
          page="Tratamientos"
          url="treatments"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          baseColor={anchorBaseColor}
          selectePageColor={selectePageColor}
        />
        <LinkAnchor
          page="Contactanos"
          url="contactus"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          baseColor={anchorBaseColor}
          selectePageColor={selectePageColor}
        />
      </>
    )
  }

  const landingMenu = () => {
    const buttonBaseColor = isTopOfPage
      ?`${sameColor} hover:bg-dark-purple-30 text-white`
      :'bg-dark-purple-05 hover:bg-dark-purple-500 text-white'

    return (
      <>
        <div className={`${flexBetween} gap-8 text-sm`}>
          { landingOptions() }
        </div>
        <div className={`${flexBetween} gap-8`}>
          <ActionButton
            baseColor={buttonBaseColor}
            setSelectedPage={setSelectedPage}
            selectedPage={SelectedPage.LogIn}>
            Logear
          </ActionButton>
          <ActionButton
            baseColor={buttonBaseColor}
            setSelectedPage={setSelectedPage}
            selectedPage={SelectedPage.Contactus}>
            Únete a Nosotors
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
                className="rounded-full bg-purple-20 p-2"
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
        <div className={`${sameColor} fixed right-0 bottom-0 z-40 h-full w-[300px] drop-shadow-xl`}>
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

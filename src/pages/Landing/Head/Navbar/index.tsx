import { useState, useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
// import Logo from "@/assets/Logo.png";
import DynamicLogo from './DynamicLogo'
import LinkAnchor from "@/components/Compound/Links/LinkAnchor";
import { SelectedPage } from "@/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/components/Compound/Buttons/ActionButton";
import LoginM from "@/pages/Landing/LoginModal";

import { Link } from "react-router-dom";

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false)
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const sameColor = 'bg-dark-purple-700'

  const termAndPolicies = ['terms', 'policies'].includes(selectedPage)
  const navbarBackground = !isTopOfPage || termAndPolicies ? `${sameColor}` : '';

  const buttonBaseColor = `h-[36px] f-size-[14px] ${isTopOfPage
    ?`${sameColor} hover:bg-dark-purple-400 text-white-01`
    :'bg-dark-purple-400 hover:bg-dark-purple-700 text-white-01'
  }`
  const anchorBaseColor = `text-[18px] ${isTopOfPage ? 'text-pink-10 hover:text-pink-50' : 'text-white-01 hover:text-pink-30'}`
  const selectePageColor ='text-[18px] text-pink-50 hover:pink-50'

  const landingOptions = () => {
    return (
      <>
        <LinkAnchor
          page="Home"
          url="home"
          toSelect={SelectedPage.Home}
          selectedPage={selectedPage}
          setSelectedPage={(selected) => {
              setSelectedPage(selected)
              setIsMenuToggled(false)
            }}
          custom={termAndPolicies}
          baseColor={anchorBaseColor}
          selectePageColor={selectePageColor}
        />
        <LinkAnchor
          page="Paquetes"
          url="packages"
          toSelect={SelectedPage.Packages}
          selectedPage={selectedPage}
          setSelectedPage={(selected) => {
              setSelectedPage(selected)
              setIsMenuToggled(false)
            }}
          custom={termAndPolicies}
          baseColor={anchorBaseColor}
          selectePageColor={selectePageColor}
        />
        <LinkAnchor
          page="Tratamientos"
          url="treatments"
          toSelect={SelectedPage.Treatments}
          selectedPage={selectedPage}
          setSelectedPage={(selected) => {
              setSelectedPage(selected)
              setIsMenuToggled(false)
            }}
          custom={termAndPolicies}
          baseColor={anchorBaseColor}
          selectePageColor={selectePageColor}
        />
        <LinkAnchor
          page="Contactanos"
          url="contactus"
          toSelect={SelectedPage.Contactus}
          selectedPage={selectedPage}
          setSelectedPage={(selected) => {
            setSelectedPage(selected)
            setIsMenuToggled(false)
          }}
          custom={termAndPolicies}
          baseColor={anchorBaseColor}
          selectePageColor={selectePageColor}
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
          <ActionButton
            baseColor={buttonBaseColor}
            action={() => setLoginModalOpen(true)}
            type='button'>
            Logear
          </ActionButton>
        </div>
      </>
    )
  }
  const movilLandingMenu = () => {
    return(
      <>
        { landingOptions() }
        <div className={`flex flex-col gap-8`}>
          <LinkAnchor
            page="Logear"
            url="login"
            custom
            selectedPage={selectedPage}
            setSelectedPage={(selected) => {
              setSelectedPage(selected)
              setIsMenuToggled(false)
            }}
            baseColor={anchorBaseColor}
            selectePageColor={selectePageColor}
            toSelect={SelectedPage.LogIn}
          />
        </div>
      </>
    )
  }


  return (
    <>
      <nav>
        <div
          className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}
        >
          <div className={`${flexBetween} mx-auto w-5/6`}>
            <div className={`${flexBetween} w-full gap-10`}>
              {/* LEFT SIDE */}
              <Link to='/'>
                <DynamicLogo  isTopOfPage={isTopOfPage}/>
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
            <div className="ml-[20%] flex flex-col gap-10 text-2xl">
              { movilLandingMenu() }
            </div>
          </div>
        }
      </nav>
      <LoginM
        isOpen={isLoginModalOpen}
        formId='ntv-modal-login-form'
        closeAction={() => setLoginModalOpen(false)}
      />
    </>
  );
};

export default Navbar;

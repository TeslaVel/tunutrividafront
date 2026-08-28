import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
// import Logo from "@/assets/Logo.png";
import DynamicLogo from './DynamicLogo'
import LinkAnchor from "@/components/Compound/Links/LinkAnchor";
import { SelectedPage } from "@/types";
import ActionButton from "@/components/Compound/Buttons/ActionButton";
import LoginM from "@/pages/Landing/LoginModal";

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage, center?: boolean) => void;
};

const Navbar: React.FC<Props> = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false)
  // Antes esto se decidía con useMediaQuery("(min-width: 930px)"), un
  // breakpoint que no coincidía con ningún valor de Tailwind. Ahora que
  // `lg` (1024px) volvió a ser el breakpoint real, se resuelve con clases
  // responsive puras (hidden lg:flex / lg:hidden) más abajo.
  const sameColor = 'bg-landing-primary-dark/90'

  const termAndPolicies = ['terms', 'policies'].includes(selectedPage)
  const navbarBackground = !isTopOfPage || termAndPolicies ? `${sameColor}` : '';

  const buttonBaseColor = `h-[36px] f-size-[14px] ${isTopOfPage
    ?`${sameColor} hover:bg-landing-primary-light text-white`
    :'bg-landing-primary-light hover:bg-landing-primary-dark text-white'
  }`
  const anchorBaseColor = 'text-[18px] text-white hover:text-landing-accent'
  const selectePageColor ='text-[18px] font-bold text-landing-accent'

  const landingOptions = () => {
    return (
      <>
        <LinkAnchor
          page="Home"
          url="home"
          selectedPage={selectedPage}
          action={() => {
            setSelectedPage(SelectedPage.Home, true)
            setIsMenuToggled(false)
          }}
          baseColor={anchorBaseColor}
          selectePageColor={selectePageColor}
        />
        <LinkAnchor
          page="Paquetes"
          url="packages"
          selectedPage={selectedPage}
          action={() => {
            setSelectedPage(SelectedPage.Packages, true)
            setIsMenuToggled(false)
          }}
          baseColor={anchorBaseColor}
          selectePageColor={selectePageColor}
        />
        <LinkAnchor
          page="Tratamientos"
          url="treatments"
          selectedPage={selectedPage}
          action={() => {
            setSelectedPage(SelectedPage.Treatments, true)
            setIsMenuToggled(false)
          }}
          baseColor={anchorBaseColor}
          selectePageColor={selectePageColor}
        />
        <LinkAnchor
          page="Contactanos"
          url="contactus"
          selectedPage={selectedPage}
          action={() => {
            setSelectedPage(SelectedPage.Contactus, true)
            setIsMenuToggled(false)
          }}
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
            selectedPage={selectedPage}
            action={() => {
              setSelectedPage(SelectedPage.LogIn)
              setIsMenuToggled(false)
              setLoginModalOpen(true)
            }}
            baseColor={anchorBaseColor}
            selectePageColor={selectePageColor}
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
              <span onClick={() => setSelectedPage(SelectedPage.Home, true)} className="cursor-pointer">
                <DynamicLogo />
              </span>

              {/* RIGHT SIDE */}
              <div className="hidden w-full items-center justify-between lg:flex">
                { landingMenu() }
              </div>
              <button
                className="rounded-full bg-landing-primary-light p-2 lg:hidden"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Bars3Icon className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU MODAL */}
        {isMenuToggled &&
          <div className={`${sameColor} fixed right-0 bottom-0 z-40 h-full w-[300px] drop-shadow-xl lg:hidden`}>
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

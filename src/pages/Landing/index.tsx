import { useEffect, useState } from "react";
import Home from "@/pages/Landing/scenes/home";
import Tratamientos from "@/pages/Landing/scenes//tratamientos";
import Packages from "@/pages/Landing/scenes//packages";
import ContactUs from "@/pages/Landing/scenes//contactUs";
import LogIn from "@/pages/Landing/scenes//logIn";
import Footer from "@/pages/Landing/scenes//footer";

import { SelectedPage } from "@/shared/types";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

export const Landing = ({ selectedPage, setSelectedPage }: Props) => {
  useEffect(() => {
    setSelectedPage(SelectedPage.Landing)
  }, []);

  return (
    <>
      <Home setSelectedPage={setSelectedPage} />
      <Packages setSelectedPage={setSelectedPage} />
      <Tratamientos setSelectedPage={setSelectedPage} />
      <ContactUs setSelectedPage={setSelectedPage} />
      <LogIn setSelectedPage={setSelectedPage} />
      <Footer />
    </>
  );
}

export default Landing;

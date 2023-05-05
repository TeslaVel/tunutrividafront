import { useEffect, useState } from "react";
import Home from "@/scenes/home";
import Tratamientos from "@/scenes/tratamientos";
import Packages from "@/scenes/packages";
import ContactUs from "@/scenes/contactUs";
import LogIn from "@/scenes/logIn";
import Footer from "@/scenes/footer";

import { SelectedPage } from "@/shared/types";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

export const Landing = ({ selectedPage, setSelectedPage }: Props) => {
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

import { useEffect, useState } from "react";
import Home from "@/pages/Landing/home";
import Treatments from "@/pages/Landing/treatments";
import Packages from "@/pages/Landing/packages";
import ContactUs from "@/pages/Landing/contactUs";
import LogIn from "@/pages/Landing/logIn";
import Footer from "@/pages/Landing/footer";

import { SelectedPage } from "@/types";

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
      <Treatments setSelectedPage={setSelectedPage} />
      <ContactUs setSelectedPage={setSelectedPage} />
      <LogIn setSelectedPage={setSelectedPage} />
      <Footer />
    </>
  );
}

export default Landing;

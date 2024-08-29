import { useEffect, useState } from "react";
import Home from "@/pages/Landing/Home";
import Treatments from "@/pages/Landing/Treatments";
import Packages from "@/pages/Landing/AllPackages";
import ContactUs from "@/pages/Landing/ContactUs/ContactUs";
import Footer from "@/pages/Landing/Footer";
import Terms from '@/pages/Landing/TermsAndPolicies/Terms';
import Policies from '@/pages/Landing/TermsAndPolicies/Policies';

// types
import { SelectedPage } from "@/types";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage, center?: boolean) => void;
  sectionNotVisible: boolean
};

export const Landing: React.FC<Props> = ({ selectedPage, setSelectedPage, sectionNotVisible}: Props) => {
  useEffect(() => {
    setSelectedPage(SelectedPage.Landing)
  }, []);

  const termsAndPolicies = ['terms', 'policies'].includes(selectedPage)

  return (
    <>
      <div style={{ display: termsAndPolicies ? 'none' : 'block'}}>
        <Home setSelectedPage={setSelectedPage} />
        <Packages setSelectedPage={setSelectedPage}/>
        <Treatments setSelectedPage={setSelectedPage}/>
        <ContactUs setSelectedPage={setSelectedPage}/>
      </div>

      <div style={{ display: termsAndPolicies && selectedPage === SelectedPage.Terms  ? 'block' : 'none'}}>
        <Terms setSelectedPage={setSelectedPage} />
      </div>

      <div style={{ display: termsAndPolicies && selectedPage === SelectedPage.Policies  ? 'block' : 'none'}}>
        <Policies setSelectedPage={setSelectedPage} />
      </div>
      {/* <LogIn setSelectedPage={setSelectedPage} /> */}
      <Footer selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
    </>
  );
}

export default Landing;

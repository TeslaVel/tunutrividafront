import Logo from "@/assets/ntv/logo_3.png";
import LinkAnchor from "@/components/Compound/Links/LinkAnchor";
// import { Link } from 'react-router-dom';

import { SelectedPage } from "@/types";

type Props = {
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void;
};

const Footer = ({selectedPage, setSelectedPage}: Props) => {
  return (
    <footer className="bg-dark-purple-700 text-white py-16 ">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img alt="logo" height={120} width={120} src={Logo} />
          <p className="my-5">
            Nos especializamos en dietas personalizadas y masajes terapéuticos con tecnología avanzada.
            Mejora tu bienestar con nuestros servicios expertos en nutrición y tratamientos de última generación.
          </p>
          <p>© TeslaDev All Rights Reserved.</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold text-pink-50">Links</h4>
          <ul>
            <li>
              <LinkAnchor
                page="Terminos y Condiciones"
                url="terms"
                toSelect={SelectedPage.Terms}
                selectedPage={selectedPage}
                setSelectedPage={(selected) => {
                  setSelectedPage(selected)
                }}
              />
            </li>

            <li>
              <LinkAnchor
                page="Politicas"
                url="policies"
                toSelect={SelectedPage.Policies}
                selectedPage={selectedPage}
                setSelectedPage={(selected) => {
                  setSelectedPage(selected)
                }}
              />
            </li>
          </ul>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold text-pink-50">Contact Us</h4>
          <p className="my-5">Tempus metus mattis risus volutpat egestas.</p>
          <p>(333)425-6825</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

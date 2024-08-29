import Logo from "@/assets/ntv/logo_3.png";
import LinkAnchor from "@/components/Compound/Links/LinkAnchor";

import { SelectedPage } from "@/types";

type Props = {
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage, center?: boolean) => void;
};

export const Footer: React.FC<Props> = ({selectedPage, setSelectedPage}: Props) => {
  return (
    <footer className="bg-primary-female-700 text-white py-16 ">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img alt="logo" height={120} width={120} src={Logo} />
          <p className="my-5">
            Nos especializamos en dietas personalizadas y masajes terapéuticos con tecnología avanzada.
            Mejora tu bienestar con nuestros servicios expertos en nutrición y tratamientos de última generación.
          </p>
          <p> © TeslaDev All Rights Reserved. </p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold text-pink-50">Links</h4>
          <ul className="gap-2 mt-4 flex flex-col">
            <li>
              <LinkAnchor
                page="Terminos y Condiciones"
                url="terms"
                selectedPage={selectedPage}
                action={() => {
                  setSelectedPage(SelectedPage.Terms, true)
                }}
              />
            </li>

            <li>
              <LinkAnchor
                page="Politicas"
                url="policies"
                selectedPage={selectedPage}
                action={() => {
                  setSelectedPage(SelectedPage.Policies, true)
                }}
              />
            </li>
          </ul>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold text-pink-50">Contactanos</h4>
          <div className="flex flex-col gap-2 mt-4">
            <LinkAnchor
              page="tunutrividalb@gmail.com"
              url="contactus"
              selectedPage={selectedPage}
              baseColor="text-white-01"
              selectePageColor="text-white-01"
              action={() => {
                const element = document.getElementById(SelectedPage.Contactus);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            <a
              href='https://api.whatsapp.com/send?phone=4125873473'
              target="_blank"
            >
              (0412) 5873473
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

import Logo from "@/assets/ntv/logo_3.png";
import LinkAnchor from "@/components/Compound/Links/LinkAnchor";

import { SelectedPage } from "@/types";

type Props = {
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage, center?: boolean) => void;
};

export const Footer: React.FC<Props> = ({selectedPage, setSelectedPage}: Props) => {
  return (
    <footer className="bg-landing-primary-dark text-white py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img alt="Tunutrivida" height={40} className="h-10 w-auto" src={Logo} />
          <p className="my-5 text-white/80">
            Nos especializamos en dietas personalizadas y masajes terapéuticos con tecnología avanzada.
            Mejora tu bienestar con nuestros servicios expertos en nutrición y tratamientos de última generación.
          </p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-semibold text-landing-accent">Links</h4>
          <ul className="gap-2 mt-4 flex flex-col">
            <li>
              <LinkAnchor
                page="Terminos y Condiciones"
                url="terms"
                selectedPage={selectedPage}
                baseColor="text-white/80 hover:text-white"
                selectePageColor="text-white font-bold"
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
                baseColor="text-white/80 hover:text-white"
                selectePageColor="text-white font-bold"
                action={() => {
                  setSelectedPage(SelectedPage.Policies, true)
                }}
              />
            </li>
          </ul>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-semibold text-landing-accent">Contáctanos</h4>
          <div className="flex flex-col gap-2 mt-4">
            <LinkAnchor
              page="tunutrividalb@gmail.com"
              url="contactus"
              selectedPage={selectedPage}
              baseColor="text-white/80 hover:text-white"
              selectePageColor="text-white/80 hover:text-white"
              action={() => {
                const element = document.getElementById(SelectedPage.Contactus);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            <a
              className="text-white/80 hover:text-white"
              href='https://api.whatsapp.com/send?phone=4125873473'
              target="_blank"
              rel="noreferrer"
            >
              (0412) 5873473
            </a>
          </div>

        </div>
      </div>
      <div className="mx-auto mt-10 w-5/6 border-t border-white/10 pt-6 text-sm text-white/60">
        © {new Date().getFullYear()} Tunutrivida. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;

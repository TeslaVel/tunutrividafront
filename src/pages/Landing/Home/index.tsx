import { SelectedPage } from "@/types";
import ActionButton from "@/components/Compound/Buttons/ActionButton";
import HText from "@/components/Compound/Title/HText";

import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Home: React.FC<Props> = ({ setSelectedPage }: Props) => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-landing-primary via-landing-primary-dark to-landing-ink"
    >
      {/* Formas decorativas: en vez de una foto de stock genérica, un
          fondo con la paleta propia del negocio (ver decisión con el
          usuario). Puramente CSS, sin peso de imagen adicional. */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-landing-primary-light/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-landing-accent/20 blur-3xl" />

      <motion.div
        className="relative z-10 mx-auto w-5/6 max-w-3xl py-24"
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText size={1} classes="text-white">
            ¡Empieza a mejorar tu salud hoy mismo!
          </HText>
          <p className="mt-6 max-w-xl text-lg font-medium text-white/90">
            Tratamientos y planes de alimentación personalizados para lograr tu mejor versión.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex items-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <ActionButton
            baseColor="bg-white text-landing-primary hover:bg-landing-cream"
            selectedPage={SelectedPage.Contactus}
            action={() => {
              setSelectedPage(SelectedPage.Contactus)
            }}
          >
            Únete Ahora
          </ActionButton>
          <AnchorLink
            className="text-sm font-bold text-white hover:text-landing-accent"
            onClick={() => setSelectedPage(SelectedPage.Contactus)}
            href={`#${SelectedPage.Contactus}`}
          >
            <p>Más información</p>
          </AnchorLink>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;

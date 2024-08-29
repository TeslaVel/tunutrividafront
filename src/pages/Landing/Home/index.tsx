import { SelectedPage } from "@/types";
import ActionButton from "@/components/Compound/Buttons/ActionButton";
import backgroundImage from "@/assets/ntv/background-1.jpg";
import HText from "@/components/Compound/Title/HText";

import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Home: React.FC<Props> = ({ setSelectedPage }: Props) => {
  return (
    <section id="home" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0 xxxs:h-full md:h-[100vh]"
     style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover'
    }}
    >
      <motion.div
        className="mx-auto w-5/6 xxxs:mt-[5rem] xxs:mt-[4rem] sm:mt-[4rem] md:mt-[15rem]"
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >

        <div className="z-10 md:basis-3/5 xs:w-4/6 md:w-3/6 ">
          <motion.div
            className=""
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <HText classes="text-pink-10 text-[2.5rem]">
              ¡Empieza a mejorar tu salud hoy mismo!
            </HText>
            <p className="mt-8 text-pink-10 font-bold text-[18px]">
              Tratamientos y planes de alimentacion personalizados para lograr tu mejor version.
            </p>
          </motion.div>

          <motion.div
            className="mt-5 flex items-center gap-8"
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
              baseColor='bg-primary-female-700 hover:bg-primary-female-400 text-white-01 xs:w-auto xxs:px-2 xs:px-2'
              selectedPage={SelectedPage.Contactus}
              action={() => {
                setSelectedPage(SelectedPage.Contactus)
              }}
            >
              Únete Ahora
            </ActionButton>
            <AnchorLink
              className="text-sm font-bold text-pink-10 hover:text-pink-30"
              onClick={() => setSelectedPage(SelectedPage.Contactus)}
              href={`#${SelectedPage.Contactus}`}
            >
              <p>Mas información</p>
            </AnchorLink>
          </motion.div>
        </div>
      </motion.div>

      {false && (
        <div className="h-[150px] w-full bg-secondly-female-05 py-10">
          <div className="mx-auto w-5/6">
            <div className="flex w-3/5 items-center justify-between gap-8">
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;

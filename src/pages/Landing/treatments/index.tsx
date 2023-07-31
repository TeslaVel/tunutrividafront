import { SelectedPage, ClassType } from "@/types";
import cavitation from "@/assets/ntv/cavitation1.png";
import radiofrecuencia from "@/assets/ntv/radiofrecuencia1.png";
import vacumterapia from "@/assets/ntv/vacumterapia1.png";
import lipolaser from "@/assets/ntv/lipolaser1.png";
import auriculoterapia from "@/assets/ntv/auriculoterapia.png";
import { motion } from "framer-motion";
import HText from "@/components/Compound/Title/HText";
// import Class from "./Class";
import Carousel from "@/components/Carousel";

const images: Array<ClassType> = [
  {
    name: "Auriculoterapia",
    description:
      "La auriculoterapia es una Lorem ipsum dolor sit amet, consectet",
    url: auriculoterapia,
  },
  {
    name: "Vacumterapia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    url: vacumterapia,
  },
  {
    name: "Ultra Cavitacion",
    description: "Porque es buena etc etc",
    url: cavitation,
  },
  {
    name: "Radiofrecuencia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    url: radiofrecuencia,
  },
  {
    name: "Lipolaser",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    url: lipolaser,
  }
];

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

export const Treatments = ({ setSelectedPage }: Props) => {
  return (
    <section id="treatments" className="
      xxxs:h-full xxs:h-full xs:h-full sm:h-full
      xxxs:py-[7rem] xxs:py-[7rem] xs:py-[7rem] sm:py-[7rem]
      md::min-h-[800px] lg:min-h-[800px]
      md::h-[100vh] lg:h-[100vh]
      flex flex-col justify-center bg-primary-female-300">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Treatments)}
      >
        <motion.div
          className="mx-auto w-5/6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="md:w-3/5 text-white-01">
            <HText>Nuestros Tratamientos</HText>
            <p className="py-5 text-[20px]">
              Ofrecemos los mejores tratamientos de la vanguardia.
            </p>
          </div>
        </motion.div>
        <div className="mt-10 h-[400px] mx-auto w-5/6">
          <Carousel
            withDescription
            withTitle
            images={images} deviceType='desktop'
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Treatments;

import { SelectedPage, ClassType } from "@/shared/types";
import cavitation from "@/assets/ntv/cavitation1.png";
import radiofrecuencia from "@/assets/ntv/radiofrecuencia1.png";
import vacumterapia from "@/assets/ntv/vacumterapia1.png";
import lipolaser from "@/assets/ntv/lipolaser1.png";
import auriculoterapia from "@/assets/ntv/auriculoterapia.png";
import image1 from "@/assets/image1.png";
import image2 from "@/assets/image2.png";
import image3 from "@/assets/image3.png";
import image4 from "@/assets/image4.png";
import image5 from "@/assets/image5.png";
import image6 from "@/assets/image6.png";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
// import Class from "./Class";
import Carousel from "./Carousel";

const classes: Array<ClassType> = [
  {
    name: "Auriculoterapia",
    description:
      "La auriculoterapia es una.........",
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
    url: radiofrecuencia,
  },
  {
    name: "Lipolaser",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    url: lipolaser,
  },
  {
    name: "Img 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    url: image1,
  },
  {
    name: "Img 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    url: image2,
  },
  {
    name: "Img 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    url: image3,
  }
];

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Treatments = ({ setSelectedPage }: Props) => {
  return (
    <section id="treatments" className="w-full min-h-full bg-purple-10 py-40">
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
          <div className="md:w-3/5">
            <HText>Nuestros Tratamientos</HText>
            <p className="py-5">
              Explicar algo aqui sobre vacumterapia, radio etc.
            </p>
          </div>
        </motion.div>
        <div className="mt-10 h-[400px] mx-auto md:w-[88%] sm:w-[100%]">
          <Carousel images={classes} />
        </div>
      </motion.div>
    </section>
  );
};

export default Treatments;

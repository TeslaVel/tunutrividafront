import { SelectedPage, ClassType, Colors } from "@/types";
import cavitation from "@/assets/ntv/cavitation1.png";
import radiofrecuencia from "@/assets/ntv/radiofrecuencia1.png";
import vacumterapia from "@/assets/ntv/vacumterapia1.png";
import lipolaser from "@/assets/ntv/lipolaser1.png";
import auriculoterapia from "@/assets/ntv/auriculoterapia.png";
import ondasrusas from "@/assets/ntv/ondasrusas.png";
import masajereductor from "@/assets/ntv/masajereductor.png";
import { motion } from "framer-motion";
import HText from "@/components/Compound/Title/HText";
// import Class from "./Class";
import Carousel from "@/components/Carousel";

const images: Array<ClassType> = [
  {
    name: "Auriculoterapia",
    description:
      "",
    url: auriculoterapia,
  },
  {
    name: "Vacumterapia",
    description:
      "Tratamiento estético no invasivo que aplica succion a la piel ayudando a mejorar la circulación sanguínea y linfática y reduce la celulitis,",
    url: vacumterapia,
  },
  {
    name: "Ultra Cavitacion",
    description: "Tratamiento estético no invasivo que utiliza ondas ultrasónicas para eliminar la grasa localizada. Es especialmente útil para reducir la grasa abdominal, de los muslos y los glúteos",
    url: cavitation,
  },
  {
    name: "Radiofrecuencia",
    description:
      "Tratamiento estético no invasivo que utiliza ondas de calor para reducir la grasa localizada y mejorar la apariencia de la piel.",
    url: radiofrecuencia,
  },
  {
    name: "Lipolaser",
    description:
      "Tratamiendo estético o invasivo que utiliza la tecnología láser para reducir la grasa localizada en áreas específicas del cuerpo, sin la necesidad de realizar incisiones en la piel utilizando láseres de baja intensidad para disolver las células de grasa",
    url: lipolaser,
  },
  {
    name: "Ondas Rusas",
    description:
      "Tratamiento de electroestimulación no invasivo donde se contrae el musculo para tonificarlo dándole firmeza a la piel.",
    url: ondasrusas,
  },
  {
    name: "Masaje Reductivo",
    description:
      "Masajes que ayudan a mejorar la circulación sanguínea, lo que ayuda a reducir la retención de líquidos y mejorar la apariencia de la piel.",
    url: masajereductor,
  }
];

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

export const Treatments: React.FC<Props> = ({ setSelectedPage }: Props) => {
  return (
    <section id="treatments" className="
      xxxs:h-full xxs:h-full xs:h-full sm:h-full
      xxxs:py-[7rem] xxs:py-[7rem] xs:py-[7rem] sm:py-[7rem]
      md::min-h-[800px] lg:min-h-[800px]
      md::h-[100vh] lg:h-[100vh]
      flex flex-col justify-center "
    style={{background:`linear-gradient(30deg, ${Colors.PRIMARYFEMALE20} 0%, ${Colors.PRIMARYFEMALE100} 100%)`}}
    >
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

import { SelectedPage, ClassType } from "@/types";
import cavitation from "@/assets/ntv/cavitation1.webp";
import radiofrecuencia from "@/assets/ntv/radiofrecuencia1.webp";
import vacumterapia from "@/assets/ntv/vacumterapia1.webp";
import lipolaser from "@/assets/ntv/lipolaser1.webp";
import auriculoterapia from "@/assets/ntv/auriculoterapia.webp";
import ondasrusas from "@/assets/ntv/ondasrusas.webp";
import masajereductor from "@/assets/ntv/masajereductor.webp";
import { motion } from "framer-motion";
import HText from "@/components/Compound/Title/HText";
import Carousel from "@/components/Carousel";

const images: Array<ClassType> = [
  {
    name: "Auriculoterapia",
    description:
      "Técnica que estimula puntos específicos del oído para apoyar el control del apetito y el equilibrio general del cuerpo.",
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
    <section
      id="treatments"
      className="bg-gradient-to-br from-landing-primary to-landing-primary-dark py-20 md:py-28"
    >
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Treatments)}
      >
        <motion.div
          className="mx-auto w-5/6 max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="text-white md:w-3/5">
            <HText size={2} classes="text-white">Nuestros Tratamientos</HText>
            <p className="py-5 text-lg text-white/90">
              Ofrecemos los mejores tratamientos de la vanguardia.
            </p>
          </div>
        </motion.div>
        <div className="mx-auto mt-10 w-5/6 max-w-6xl">
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

import HText from "@/components/Compound/Title/HText";
import { SelectedPage, ClassType } from "@/types";
import { motion } from "framer-motion";
import Package from "@/components/Package/Package";

// Datos reales tomados de los flyers promocionales existentes
// (src/assets/ntv/package-1/2/3.png) — se muestran acá como tarjetas de
// texto en vez de las imágenes, para que combinen con la paleta nueva del
// sitio en vez del diseño tipo flyer (corazones/rosa) de esos archivos.
const pks: Array<ClassType> = [
  {
    name: "Paquete 1",
    price: "10",
    features: ["1 sesión de aparatología", "1 sesión de drenaje"],
  },
  {
    name: "Paquete 2",
    price: "15",
    features: [
      "1 sesión de aparatología",
      "1 sesión de drenaje",
      "1 sesión de auriculoterapia",
    ],
  },
  {
    name: "Paquete 3",
    price: "20",
    features: [
      "1 sesión de aparatología",
      "1 sesión de drenaje",
      "1 sesión de auriculoterapia",
      "Consulta nutricional",
      "Plan de alimentación",
    ],
    highlighted: true,
  },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const AllPackages: React.FC<Props> = ({ setSelectedPage }: Props) => {
  return (
    <section id="packages" className="bg-white py-20 md:py-28">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Packages)}
        className="mx-auto w-5/6 max-w-6xl"
      >
        {/* HEADER */}
        <motion.div
          className="md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText size={2} classes="text-landing-ink">Más que una dieta</HText>
          <p className="mt-4 text-lg text-landing-muted">
            Proveemos un tratamiento nutricional adecuado a tu metabolismo, antecedentes y gustos.
          </p>
        </motion.div>

        {/* PAQUETES */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {pks.map((pack: ClassType) => (
            <Package
              key={pack.name}
              name={pack.name}
              description={pack.description}
              price={pack.price}
              features={pack.features}
              highlighted={pack.highlighted}
              setSelectedPage={setSelectedPage}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AllPackages;

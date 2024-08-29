import HText from "@/components/Compound/Title/HText";
import { SelectedPage, ClassType } from "@/types";
import { motion } from "framer-motion";
import package_1 from "@/assets/ntv/package-1.png";
import package_2 from "@/assets/ntv/package-2.png";
import package_3 from "@/assets/ntv/package-3.png";
import Package from "@/components/Package/Package";

const pks: Array<ClassType> = [
  {
    name: "Paquete 1",
    url: package_1,
  },
  {
    name: "Paquete 2",
    url: package_2,
  },
  {
    name: "Paquete 3",
    url: package_3,
  }
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
    <section id="packages" className="
      xxxs:h-full xxs:h-full xs:h-full sm:h-full
      xxxs:py-[7rem] xxs:py-[7rem] xs:py-[7rem] sm:py-[7rem]
      md:min-h-[800px] lg:min-h-[800px]
      lg:h-[100vh] md:h-[100vh]
      flex flex-col justify-center">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Packages)}
        className="mx-auto w-5/6"
      >
        {/* HEADER */}
        <motion.div
          className="md:my-5 md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText classes='text-pink-500'>Más que una dieta</HText>
          <p className="px-1 my-5 text-[20px] text-pink-500">
            Proveemos un tratamiento nutricional adecuado a tu metabolismo y antecedentes y gustos
          </p>
        </motion.div>

        {/* BENEFITS */}
        <motion.div
          className="mt-5 items-center justify-between gap-5 md:flex-row flex
          xxxs:flex-col xxs:flex-col xs:flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {pks.map((pack: ClassType) => (
            <Package
              classes=""
              key={pack.name}
              name={pack.name}
              url={pack.url}
              setSelectedPage={setSelectedPage}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AllPackages;

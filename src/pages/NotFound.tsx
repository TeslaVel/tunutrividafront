import { SelectedPage } from "@/types";
import { motion } from "framer-motion";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};


export const NotFound: React.FC<Props> = ({ setSelectedPage }: Props) => {
  return (
    <>
      <section id="notfound" className="gap-16 py-10 md:h-full md:pb-0">
        <motion.div
          className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
          onViewportEnter={() => setSelectedPage(SelectedPage.NotFound)}
        >
          Error 404.
        </motion.div>
      </section>
    </>
  )
}

export default NotFound;
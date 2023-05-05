import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

export const Profile = ({ setSelectedPage }: Props) => {
  return (
    <>
      <section id="profil" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
        <motion.div
          className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
          onViewportEnter={() => setSelectedPage(SelectedPage.Profile)}
        >
          Esta es la pagiona del Profile
        </motion.div>
      </section>
    </>
  );
}

export default Profile;

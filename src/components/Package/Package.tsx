import { SelectedPage } from "@/types";
import { motion } from "framer-motion";

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

type Props = {
  name: string;
  url: string;
  classes?: string;
  description?: string;
  setSelectedPage: (value: SelectedPage) => void;
};

const Package: React.FC<Props> = ({name, url, classes}: Props) => {
  return (
    <motion.div
      variants={childVariant}
      className='w-full h-[350px] '
    >
       <img
        src={url}
        alt={name}
        className={`rounded-md border-2 w-full h-full hover:scale-110 hover:rounded-xl transition-transform`}/>
    </motion.div>
  );
};

export default Package
import { SelectedPage } from "@/types";
import { motion } from "framer-motion";
import HText from "@/components/Compound/Title/HText";

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

type Props = {
  name: string;
  url?: string;
  classes?: string;
  description?: string;
  price?: string;
  features?: string[];
  highlighted?: boolean;
  setSelectedPage: (value: SelectedPage) => void;
};

const Package: React.FC<Props> = ({ name, description, price, features, highlighted }: Props) => {
  return (
    <motion.div
      variants={childVariant}
      className={`flex w-full flex-col rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl ${
        highlighted ? "ring-2 ring-landing-primary" : ""
      }`}
    >
      <HText size={4} classes="text-landing-ink">{name}</HText>
      {description && (
        <p className="mt-2 text-sm text-landing-muted">{description}</p>
      )}
      {features && features.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2 text-sm text-landing-ink">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-landing-primary" />
              {feature}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex items-baseline gap-1">
        {price ? (
          <>
            <span className="text-3xl font-extrabold text-landing-primary">${price}</span>
          </>
        ) : (
          <span className="inline-block rounded-full bg-landing-cream px-3 py-1 text-xs font-semibold text-landing-primary">
            Consultar precio
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default Package

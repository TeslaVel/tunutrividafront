import { useForm } from "react-hook-form";
import { SelectedPage } from "@/types";
import { motion } from "framer-motion";
import HText from "@/components/Compound/Title/HText";
import { useMutationContactUs } from '@/hooks/graph/useMutationContactUs';


type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

export const ContactUs: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const { CreateContactUs, loading } = useMutationContactUs();

  const inputStyles = `mb-4 w-full rounded-lg border border-landing-primary/15 px-4 py-2.5 text-landing-ink placeholder-landing-muted/60 focus:border-landing-primary focus:outline-none`;
  const labelStyles = `mb-1 block text-sm font-semibold text-landing-ink`;
  const buttonStyles = `mt-2 w-full rounded-lg bg-landing-primary px-10 py-3 font-semibold text-white transition duration-300 hover:bg-landing-primary-dark md:w-auto`

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const values = getValues()
    CreateContactUs({variables: values });
  };

  return (
    <section id="contactus" className="bg-landing-cream py-20 md:py-28">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Contactus)}
        className="mx-auto grid w-5/6 max-w-6xl gap-12 md:grid-cols-2 md:items-center"
      >
        {/* HEADER + CONTACTO */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText size={2} classes="text-landing-ink">
            Únete y comienza a moldear tu mejor versión
          </HText>
          <p className="my-5 text-lg text-landing-muted">
            Completa el formulario y comencemos a cumplir tus objetivos.
          </p>
          <div className="mt-8 flex flex-col gap-2 text-sm text-landing-muted">
            <a href="mailto:tunutrividalb@gmail.com" className="hover:text-landing-primary">
              tunutrividalb@gmail.com
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=4125873473"
              target="_blank"
              rel="noreferrer"
              className="hover:text-landing-primary"
            >
              (0412) 5873473
            </a>
          </div>
        </motion.div>

        {/* FORMULARIO */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <form
            target="_blank"
            onSubmit={onSubmit}
            method="POST"
            className="rounded-2xl bg-white p-8 shadow-lg"
          >
            <label className={labelStyles}>Nombre</label>
            <input
              className={inputStyles}
              type="text"
              placeholder="Tu nombre"
              {...register("first_name", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.first_name && (
              <p className="-mt-3 mb-3 text-sm text-landing-primary">
                {errors.first_name.type === "required" && "Este campo es obligatorio."}
                {errors.first_name.type === "maxLength" &&
                  "El máximo son 100 caracteres."}
              </p>
            )}

            <label className={labelStyles}>Apellido</label>
            <input
              className={inputStyles}
              type="text"
              placeholder="Tu apellido"
              {...register("last_name", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.last_name && (
              <p className="-mt-3 mb-3 text-sm text-landing-primary">
                {errors.last_name.type === "required" && "Este campo es obligatorio."}
                {errors.last_name.type === "maxLength" &&
                  "El máximo son 100 caracteres."}
              </p>
            )}

            <label className={labelStyles}>Correo electrónico</label>
            <input
              className={inputStyles}
              type="text"
              placeholder="tu@email.com"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email && (
              <p className="-mt-3 mb-3 text-sm text-landing-primary">
                {errors.email.type === "required" &&
                  "Este campo es obligatorio."}
                {errors.email.type === "pattern" && "Correo electrónico inválido."}
              </p>
            )}

            <label className={labelStyles}>Mensaje</label>
            <textarea
              className={inputStyles}
              placeholder="Contanos qué buscás lograr"
              rows={4}
              {...register("message", {
                required: true,
                maxLength: 2000,
              })}
            />
            {errors.message && (
              <p className="-mt-3 mb-3 text-sm text-landing-primary">
                {errors.message.type === "required" &&
                  "Este campo es obligatorio."}
                {errors.message.type === "maxLength" &&
                  "El máximo son 2000 caracteres."}
              </p>
            )}

            <button
              type="submit"
              className={buttonStyles}
              disabled={loading}
            >
              Enviar mensaje
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactUs;

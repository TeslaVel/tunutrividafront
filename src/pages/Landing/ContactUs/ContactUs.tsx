import { useForm } from "react-hook-form";
import { SelectedPage } from "@/types";
import { motion } from "framer-motion";
import ImageNtv3 from "@/assets/ntv/imagen_ntv_3.png";
import HText from "@/components/Compound/Title/HText";
import { useMutationContactUs } from '@/hooks/graph/useMutationContactUs';


type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

export const ContactUs: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const { CreateContactUs, data, loading, error, reset } = useMutationContactUs();

  const inputStyles = `mb-5 w-full rounded-lg px-5 py-2 bg-primary-female-500 text-white-01 placeholder-gray-purple-10`;
  const buttonStyles = `mt-5 rounded-lg px-20 py-3 transition duration-500
  bg-primary-female-500 hover:bg-primary-female-200 text-white-01 xxs:w-full sm:w-full md:w-auto`

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const values = getValues()
 
    console.log('values', getValues())
    CreateContactUs({variables: values });
  };

  return (
    <section id="contactus" className="
      xxxs:h-full xxs:h-full xs:h-full sm:h-full
      xxxs:py-[7rem] xxs:py-[7rem] xs:py-[7rem] sm:py-[7rem]
      md:min-h-[800px] lg:min-h-[800px]
      md:h-[100vh] lg:h-[100vh]
      flex flex-col justify-center">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Contactus)}
        className="justify-between flex flex-col mx-auto xxxs:px-4 xxs:px-4 xxs:w-full sm:w-full  md:w-4/6  lg:w-3/6"
      >
        {/* FORM AND IMAGE */}
          {/* HEADER */}
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
            <HText>
              <span className="text-pink-500">ÚNETE</span> <span className="text-pink-100">Y COMIENZA A MOLDEAR TU MEJOR VERSION</span>
            </HText>
            <p className="my-5 text-[18px] text-pink-500">
              Completa el formulario y comencemos a cumplir tus objetivos.
            </p>
          </motion.div>

          <motion.div
            className="xxxs:mt-5 xxs:mt-5 xs:mt-5 sm:mt-12 md:mt-12 basis-3/5 md:mt-0"
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
            >
              <input
                className={inputStyles}
                type="text"
                placeholder="FIRST NAME"
                {...register("first_name", {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors.first_name && (
                <p className="mt-1 text-primary-500">
                  {errors.first_name.type === "required" && "This field is required."}
                  {errors.first_name.type === "maxLength" &&
                    "Max length is 100 char."}
                </p>
              )}

              <input
                className={inputStyles}
                type="text"
                placeholder="LAST NAME"
                {...register("last_name", {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors.last_name && (
                <p className="mt-1 text-primary-500">
                  {errors.last_name.type === "required" && "This field is required."}
                  {errors.last_name.type === "maxLength" &&
                    "Max length is 100 char."}
                </p>
              )}

              <input
                className={inputStyles}
                type="text"
                placeholder="EMAIL"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email && (
                <p className="mt-1 text-primary-500">
                  {errors.email.type === "required" &&
                    "This field is required."}
                  {errors.email.type === "pattern" && "Invalid email address."}
                </p>
              )}

              <textarea
                className={inputStyles}
                placeholder="MESSAGE"
                rows={4}
                cols={50}
                {...register("message", {
                  required: true,
                  maxLength: 2000,
                })}
              />
              {errors.message && (
                <p className="mt-1 text-primary-500">
                  {errors.message.type === "required" &&
                    "This field is required."}
                  {errors.message.type === "maxLength" &&
                    "Max length is 2000 char."}
                </p>
              )}

              <button
                type="submit"
                className={buttonStyles}
                disabled={loading}
              >
                ENVIAR
              </button>
            </form>
          </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactUs;

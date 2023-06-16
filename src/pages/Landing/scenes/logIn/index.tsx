import { useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
// import ContactUsPageGraphic from "@/assets/ContactUsPageGraphic.png";
import Scale1 from "@/assets/ntv/scale1.png";
import HText from "@/shared/HText";
import { AuthContext } from '@/AuthProviderManager';
import { useMutationLogin } from '@/hooks/graph/useMutationLogin';

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const LogIn = ({ setSelectedPage }: Props) => {
  const { storeUser } = useContext(AuthContext);
  const { Login, data, loading, error, reset } = useMutationLogin();

  useEffect(() =>{
    if ( data && data?.createAuth ) {
      console.log('createAuth si hay data', data.createAuth.token);
      if (data.createAuth.token !== null) {
        storeUser(data.createAuth);
      } else {
        alert('credentials invalid')
      }
    }
  }, [data?.createAuth]);

  const inputStyles = `mb-5 w-full rounded-lg bg-purple-15
  px-5 py-3 placeholder-white`;

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const values = getValues()
    console.log('login values', getValues())
    Login({variables: values });
  };

  return (
    <section id="login" className="mx-auto w-5/6 pt-[8rem] pb-[17rem]">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.LogIn)}
        className='justify-between gap-8 md:flex'
      >

        {/* FORM AND IMAGE */}
        <div>
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
            <HText>
              <span className="text-primary-500">LOGIN</span>
            </HText>
            <p className="my-5">
              Ingresa con energía y siente la transformación en tu cuerpo - ¡Bienvenido a nuestro portal de salud nutricional!
            </p>
          </motion.div>

          <motion.div
            className="basis-3/5 md:mt-0"
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

              <input
                className={inputStyles}
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors.password && (
                <p className="mt-1 text-primary-500">
                  {errors.password.type === "required" && "This field is required."}
                  {errors.password.type === "maxLength" &&
                    "Max length is 100 char."}
                </p>
              )}


              <div className="flex sm:gap-4 sm:flex-col lg:flex-row lg:justify-between mt-5">
                <button
                  type="submit"
                  className="sm:px-15 px-20 text-center w-auto rounded-lg bg-purple-15 hover:bg-purple-50 py-3 transition duration-500 hover:text-white"
                >
                  Logear
                </button>

                <a className="sm:px-16 px-20 text-center w-auto rounded-lg bg-purple-15 hover:bg-purple-50 px-20 py-3 transition duration-500 hover:text-white"
                  onClick={() => setSelectedPage(SelectedPage.Contactus)}
                  href={`#${SelectedPage.Contactus}`} >
                  Únete a Nosotors
                </a>
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div
            className="relative mt-16 basis-3/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="w-full before:absolute before:-bottom-20 before:-right-10 before:z-[-1]">
              <img
                className="w-full"
                alt="contact-us"
                src={Scale1}
              />
            </div>
          </motion.div>
      </motion.div>
    </section>
  );
};

export default LogIn;

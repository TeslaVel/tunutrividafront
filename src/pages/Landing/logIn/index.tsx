import { useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { SelectedPage } from "@/types";
import { motion } from "framer-motion";
// import ContactUsPageGraphic from "@/assets/ContactUsPageGraphic.png";
import Scale1 from "@/assets/ntv/scale1.png";
import HText from "@/components/Compound/Title/HText";
import { AuthContext } from '@/AuthProviderManager';
import { useMutationLogin } from '@/hooks/graph/useMutationLogin';
import '@/components/Compound/Buttons/ActionButton.css'

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const LogIn: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const { storeUser } = useContext(AuthContext);
  const { Login, data, loading, error, reset } = useMutationLogin();

  useEffect(() =>{
    if ( data && data?.createAuth ) {
      if (data.createAuth.token !== null) {
        storeUser(data.createAuth);
      } else {
        alert('credentials invalid')
      }
    }

  }, [data?.createAuth]);

  const inputStyles = `
  bg-primary-female-600
  text-white placeholder-white
  px-5 py-3 mb-5 w-full rounded-md`;

  const buttonStyles = `ntv-custom-button-shadow
  bg-primary-female-500 hover:bg-primary-female-700
  text-white sm:px-7 text-center hover:text-white
  py-3  px-10 w-auto rounded-lg
  transition duration-500`

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const values = getValues();
    Login({variables: values });
  };

  return (
    <section id="login" className="py-[8rem] min-h-[700px] h-[100vh] bg-secondly-female-05">
        <motion.div
          onViewportEnter={() => setSelectedPage(SelectedPage.LogIn)}
          className='flex justify-center items-center h-full gap-8'
        >
          {/* FORM AND IMAGE */}
          <div className="xxxs:px-4 xxs:px-4 md:p-5 sm:w-full md:w-full md:w-3/6 lg:w-2/6 bg-primary-female-500 rounded-lg text-white-01">
            {/* HEADER */}
            <motion.div
              className="mb-[3rem]"
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
                <span className="text-white-01">LOGIN</span>
              </HText>
              <p className="my-5 text-[18px] text-white-01">
                Ingresa con energía y siente la transformación en tu cuerpo - ¡Bienvenido a nuestro portal de salud nutricional!
              </p>
            </motion.div>

            <motion.div
              className="basis-3/5 md:mt-0 "
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

                <div className="flex gap-4 xxxs:flex-col xxs:flex-col sm:flex-row lg:flex-row mt-5">
                  <button
                    type="submit"
                    className={`${buttonStyles} sm:flex-[2] md:flex-[none] md:w-auto`}
                  >
                    Logear
                  </button>

                  <a className={`${buttonStyles} sm:flex-1 md:flex-[none] md:w-auto`}
                    onClick={() => setSelectedPage(SelectedPage.Contactus)}
                    href={`#${SelectedPage.Contactus}`} >
                    Únete
                  </a>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
    </section>
  );
};

export default LogIn;

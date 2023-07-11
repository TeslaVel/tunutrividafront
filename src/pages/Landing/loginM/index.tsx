import { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { SelectedPage } from "@/types";
import { AuthContext } from '@/AuthProviderManager';
import { useMutationLogin } from '@/hooks/graph/useMutationLogin';
import ModalDesign from "@/components/Modal/ModalDesign";
import '@/components/Compound/Buttons/ActionButton.css'

type Props = {
  formId: string
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const LoginM = ({ formId, selectedPage, setSelectedPage}: Props) => {
  const { storeUser } = useContext(AuthContext);
  const { Login, data, loading, error, reset } = useMutationLogin();
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false)
  const [lastSelected, setLastSelected] = useState<SelectedPage>(selectedPage)

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

  useEffect(() => {
    if (selectedPage != SelectedPage.LogIn ) setLastSelected(selectedPage)

    setLoginModalOpen(selectedPage === SelectedPage.LogIn)
  }, [selectedPage]);

  const inputStyles =`
  bg-purple-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
`;

  const buttonStyles = `
  ntv-custom-button-shadow w-full text-white bg-dark-purple-500 hover:bg-dark-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center
  `

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const values = getValues()
    console.log('login values', getValues())
    Login({variables: values });
  };

  const handleClose = () => {
    setLoginModalOpen(false)
    setSelectedPage(lastSelected)
  }

  if (!isLoginModalOpen) return null

  return (
    <form
      id={formId}
      target="_self"
      onSubmit={handleSubmit}
      method="POST"
    >
      <ModalDesign
        title='Iniciar Session'
        isOpen={isLoginModalOpen}
        width="w-[30rem]"
        close={() => handleClose()}
        action={handleSubmit}
        buttonTitle='Logear'
      >
        <>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              type="email"
              id="email"
              className={inputStyles}
              placeholder="name@company.com"
              required={true}
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
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className={inputStyles}
              required={true}
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
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" aria-describedby="remember" type="checkbox"
                className="w-4 h-4 border border-dark-purple-300 rounded bg-dark-purple-50 focus:ring-1 focus:ring-purpl-100 dark:focus:ring-dark-purple-600 dark:ring-offset-purple-100" required={true} />
              </div>
              <div className="ml-3 text-sm">
                <label  className="text-gray-500 dark:text-gray-300">Remember me</label>
              </div>
            </div>
            <a href="#" className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-50">Olvidó su contraseña?</a>
          </div>
          <button
            type="submit"
            className={buttonStyles}>
             Logear
          </button>
        </>
      </ModalDesign>
    </form>
  );
};

export default LoginM;

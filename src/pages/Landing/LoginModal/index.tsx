import { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
// import { SelectedPage } from "@/types";
import { AuthContext } from '@/AuthProviderManager';
import { useMutationLogin } from '@/hooks/graph/useMutationLogin';
import Modal from "@/components/Modal/Modal";
import '@/components/Compound/Buttons/ActionButton.css'

type Props = {
  formId: string
  isOpen: boolean
  closeAction: () => void
};

const LoginModal: React.FC<Props> = ({ formId, isOpen, closeAction}: Props) => {
  const { storeUser } = useContext(AuthContext);
  const { Login } = useMutationLogin();

  const inputStyles =`
  bg-secondly-female-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
`;

  const buttonStyles = `
  ntv-custom-button-shadow w-full text-white bg-primary-female-500 hover:bg-primary-female-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center
  `

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAction = async () => {
    const values = getValues();
    try {
      const response = await Login(values);
      if (response.data?.createAuth.token) {
        storeUser(response.data.createAuth);
      }
    } catch (error) {
      console.error(error);
      alert('credentials invalid');
    }
  };

  const handleClose = () => {
    closeAction()
  }

  if (!isOpen) return null

  return (
    <form
      id={formId}
      target="_self"
      method="POST"
      onSubmit={handleSubmit(handleAction)}
    >
      <Modal
        title='Iniciar Session'
        isOpen={isOpen}
        width="w-[30rem]"
        close={() => handleClose()}
        buttonTitle='Logear'
      >
        <>
          <div>
            <label className="block mb-2 text-sm font-medium text-white dark:text-white">Email</label>
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
            <label className="block mb-2 text-sm font-medium text-white dark:text-white">Contraseña</label>
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
                className="w-4 h-4 border border-primary-female-300 rounded bg-primary-female-50 focus:ring-1 focus:ring-purpl-100 dark:focus:ring-primary-female-600 dark:ring-offset-secondly-female-100" required={true} />
              </div>
              <div className="ml-3 text-sm">
                <label  className="text-secondly-female-200 dark:text-gray-300">Remember me</label>
              </div>
            </div>
            <a href="#" className="text-sm font-medium text-secondly-female-200 hover:underline dark:text-secondly-female-50">Olvidó su contraseña?</a>
          </div>
          <button
            type="submit"
            className={buttonStyles}>
             Logear
          </button>
        </>
      </Modal>
    </form>
  );
};

export default LoginModal;

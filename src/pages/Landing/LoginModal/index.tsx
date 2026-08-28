import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '@/AuthProviderManager';
import { useMutationLogin } from '@/hooks/graph/useMutationLogin';
import Modal from "@/components/Modal/Modal";

type Props = {
  formId: string
  isOpen: boolean
  closeAction: () => void
};

const LoginModal: React.FC<Props> = ({ formId, isOpen, closeAction}: Props) => {
  const { storeUser } = useContext(AuthContext);
  const { Login, loading, error, reset } = useMutationLogin();
  // `error` de Apollo solo se llena en el flujo real; en modo mock
  // (VITE_APP_USE_MOCK_DATA) el hook tira un Error sincrónico que no pasa
  // por Apollo, así que se cubre acá también.
  const [loginFailed, setLoginFailed] = useState(false);

  const inputStyles = `
    w-full rounded-lg border border-landing-primary/20 bg-white px-3 py-2.5 text-sm text-landing-ink
    placeholder-landing-muted/60 focus:border-landing-primary focus:outline-none focus:ring-1 focus:ring-landing-primary
  `;

  const buttonStyles = `
    w-full rounded-lg bg-landing-primary px-5 py-2.5 text-center text-sm font-semibold text-white
    transition duration-300 hover:bg-landing-primary-dark disabled:cursor-not-allowed disabled:opacity-60
  `

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAction = async () => {
    reset?.();
    setLoginFailed(false);
    const values = getValues();
    try {
      const response = await Login(values);
      if (response.data?.createAuth.token) {
        storeUser(response.data.createAuth);
        closeAction();
      } else {
        setLoginFailed(true);
      }
    } catch (err) {
      console.error(err);
      setLoginFailed(true);
    }
  };

  const handleClose = () => { closeAction() }

  if (!isOpen) return null

  return (
    <form id={formId} target="_self" method="POST" onSubmit={handleSubmit(handleAction)}>
      <Modal title='Iniciar sesión' isOpen={isOpen} width="w-full sm:w-[26rem]" close={() => handleClose()}>
        <>
          {(error || loginFailed) && (
            <div className="mb-4 rounded-lg border border-landing-primary/30 bg-landing-cream px-3 py-2 text-sm text-landing-primary">
              Email o contraseña incorrectos. Intentá de nuevo.
            </div>
          )}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-landing-ink">Email</label>
            <input type="email" id="email" className={inputStyles} placeholder="nombre@correo.com" required={true}
              {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-landing-primary">
                {errors.email.type === "required" && "Este campo es obligatorio."}
                {errors.email.type === "pattern" && "Correo electrónico inválido."}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-landing-ink">Contraseña</label>
            <input type="password" id="password" placeholder="••••••••" className={inputStyles} required={true}
              {...register("password", { required: true, maxLength: 100 })}
            />
             {errors.password && (
                <p className="mt-1 text-sm text-landing-primary">
                  {errors.password.type === "required" && "Este campo es obligatorio."}
                  {errors.password.type === "maxLength" && "El máximo son 100 caracteres."}
                </p>
              )}
          </div>
          <div className="mb-5 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-landing-muted">
              <input id="remember" type="checkbox"
                className="h-4 w-4 rounded border-landing-primary/30 text-landing-primary focus:ring-landing-primary" />
              Recordarme
            </label>
            <a href="#" className="text-sm font-medium text-landing-primary hover:underline">¿Olvidó su contraseña?</a>
          </div>
          <button type="submit" className={buttonStyles} disabled={loading}>
             {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </>
      </Modal>
    </form>
  );
};

export default LoginModal;

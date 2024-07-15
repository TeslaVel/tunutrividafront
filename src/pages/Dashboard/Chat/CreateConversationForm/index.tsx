import { useForm } from "react-hook-form"
import { useMutationCreateConversation } from '@/hooks/graph/useMutationCreateConversation'
import Aside from '@/components/Aside'

// types
import { FullUserType, ThemeType } from '@/types'

type Props = {
  userStored: FullUserType | null;
  theme: ThemeType
  refetchConversation: () => void
  isOpenAside: boolean;
  setIsOpenAside: (value: boolean) => void;
};

export const CreateConversationForm: React.FC<Props> = ({
  refetchConversation,
  isOpenAside,
  setIsOpenAside,
  userStored,
  theme
}: Props) => {
  const { CreateConversation, loading, error } = useMutationCreateConversation();

  const {
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const createAction = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const values = {
      ...getValues(),
      dietitian_id: `${userStored?.dietitianId}`
    }

    const { data } = await CreateConversation({ variables: values }) || {};
    if (error) {
      console.log(error)
    }
    else if (data && data.createConversation) {
      refetchConversation()
      setIsOpenAside(false)
    }
  };

  const inserEmoji = (emoji: string) => {
    const values = getValues()
    let message = values.message
    const inputField = document.getElementById('message') as HTMLInputElement;
    if (message !== null) {
      message += ` ${emoji}`;
    }
    if (inputField !== null) {
      inputField.value = message;
    }

    setValue('message', message);
  }

  const closeAside = () => {
    reset()
    setIsOpenAside(false)
  }

  return(
    <Aside
      isOpen={isOpenAside}
      theme={theme}
      close={() => closeAside()}
      title="Nueva Conversación"
    >
      <>
        <form
          target="_blank"
          onSubmit={createAction}
          method="POST"
          id="form-create-entry"
          encType="multipart/form-data"
        >
          <div className="py-2">
            <div id="emojiPanel" className="flex ml-1 pb-1 gap-3 emoji-panel">
              <button type="button" className="emoji" onClick={() => inserEmoji('👍')}>👍</button>
              <button type="button" className="emoji" onClick={() => inserEmoji('👏')}>👏</button>
              <button type="button" className="emoji" onClick={() => inserEmoji('☺️')}>☺️</button>
              <button type="button" className="emoji" onClick={() => inserEmoji('🎉')}>🎉</button>
              <button type="button" className="emoji" onClick={() => inserEmoji('🤔')}>🤔</button>
              <button type="button" className="emoji" onClick={() => inserEmoji('😎')}>😎</button>
            </div>
            <label htmlFor="message">
              <textarea
                id="message"
                className={`w-full px-2 ${theme?.general.baseTextColor}`} autoComplete='off'
                placeholder="Dile hola a tu dietista"
                {...register("message", {
                  required: true,
                  minLength: 1,
                })}
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              className={`px-3 py-1 w-full
                ${theme?.general.secondaryBgColor}
                ${theme?.general.secondaryBgColorHover}
                text-white rounded-lg`}
              disabled={loading}
            >
              Crear
            </button>
          </div>
        </form>
      </>
    </Aside>
  )
};

export default CreateConversationForm;
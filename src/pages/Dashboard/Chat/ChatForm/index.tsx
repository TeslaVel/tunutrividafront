import { useEffect } from "react";
import { useMutationCreateNote } from '@/hooks/graph/useMutationCreateNote'
import { useForm } from "react-hook-form"
import { customDateFormat } from '@/libs/utils/TimeUtils'
import MessageBubble from '@/components/MessageBubble'

// types
import { FullUserType, ConversationType, CommentType, ThemeType} from "@/types";

interface Props {
  refetchConversation: () => void
  conversation: ConversationType
  userStored: FullUserType | null;
  theme: ThemeType
  handleCableAction: (id: string) => void
}

export const ChatForm: React.FC<Props> = ({userStored, conversation, refetchConversation, theme, handleCableAction}: Props) => {
  const notes = conversation?.notes

  useEffect(() => {
    scrollDiv()
  }, []);

  useEffect(() => {
    scrollDiv()
  }, [notes]);

  const { CreateNote, data, loading, error } = useMutationCreateNote();
  const {
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const scrollDiv = () => {
    const myDiv = document.getElementById('content-note-scroll')
    if (myDiv) {
      setTimeout(() => {
        myDiv.scrollTop = myDiv.scrollHeight;
      }, 2);
    }
  }

  // Antes escribía a document.getElementById('message').value Y a
  // setValue al mismo tiempo (dos fuentes de verdad); ahora solo pasa
  // por react-hook-form.
  const inserEmoji = (emoji: string) => {
    const current = getValues('message') || ''
    setValue('message', `${current} ${emoji}`, { shouldDirty: true, shouldValidate: true })
  }


  const createAction = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const values = {
      conversation_id: conversation.id,
      ...getValues()
    }

    const { data } = await CreateNote({ variables: values }) || {};
    if (error) {
      console.log(error)
    }
    else if (data && data.createNote) {
      handleCableAction(data.createNote.id);
      refetchConversation();
      reset()
    }
  };

  return (
    <div>
      <div
        className={`flex flex-col w-auto overflow-hidden xxxs:h-[35vh] xxs:h-[35vh] xs:h-[40vh] sm:h-[50vh] md:h-[50vh] border ${theme?.entry.border} bg-white`}
        style={{borderRadius: '20px 20px 0 0 '}}>
        <div id='content-note-scroll' className="overflow-y-scroll px-2">
          {notes?.map((comment: CommentType, index: number) => (
            <MessageBubble
              key={`comment_${comment.id}-${index}`}
              isOwn={!!userStored && userStored.id === comment.user.id}
              initials={comment.user.initials}
              fullName={comment.user.fullName}
              message={comment.message}
              timestamp={customDateFormat(comment.createdAt, 'MMM D at HH:mm:a')}
              theme={theme}
            />
          ))}
        </div>
      </div>

      <form
        target="_blank"
        onSubmit={createAction}
        method="POST"
        id="form-create-note"
      >
        <div className={`
          min-w-[100px] flex md:flex-row sm:flex-row xxxs:flex-col xxs:flex-col justify-between items-center gap-3 pb-3 pt-8 px-3
          ${theme?.entry.secondaryBgColor}
        `}
        style={{borderRadius: '0 0 20px 20px'}}>
          <div className="flex flex-grow flex-col xxxs:w-full xxs:w-full " >
            <div id="emojiPanel" className="flex ml-1 pb-1 gap-3 emoji-panel">
              <button type="button" className="emoji" onClick={() => inserEmoji('👍')}>👍</button>
              <button type="button" className="emoji" onClick={() => inserEmoji('👏')}>👏</button>
              <button type="button" className="emoji" onClick={() => inserEmoji('☺️')}>☺️</button>
              <button type="button" className="emoji" onClick={() => inserEmoji('🎉')}>🎉</button>
              <button type="button" className="emoji" onClick={() => inserEmoji('🤔')}>🤔</button>
              <button type="button" className="emoji" onClick={() => inserEmoji('😎')}>😎</button>
            </div>
            <input
              {...register("message", {
                required: true,
                minLength: 1,
              })}
              id='message'
              type="text"
              placeholder="Escribe tu mensaje..."
              className="mr-2 p-1 border rounded-lg focus:outline-none" />
          </div>
          <button className={`
          xxxs:w-full xxs:w-full md:w-auto lg:w-auto px-4 py-1
          text-white-01 rounded-lg
          ${theme?.general.primaryBgColor} ${theme?.general.primaryBgColorHover} `}
          style={{alignSelf: 'end'}}
          disabled={loading}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatForm;



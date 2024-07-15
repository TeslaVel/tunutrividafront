import { useForm } from "react-hook-form";

// types
import { FullUserType, CommentType, ThemeType } from '@/types'

type Props = {
  userStored: FullUserType
  theme: ThemeType
  entry_id: string
  comments: CommentType[]
  sentComments: (values: any) => Promise<void>
  loading: boolean
}

export const Comments: React.FC<Props> = ({sentComments, entry_id, comments, userStored, theme, loading}: Props) => {
    const inserEmoji = (emoji: string) => {
      const inputField = document.getElementById('messageInput') as HTMLInputElement;

      if (inputField !== null) {
        inputField.value += ` ${emoji}`;
      }
    }

    const {
      register,
      getValues,
      formState: { errors },
    } = useForm();

    const onSubmit = async (e: React.SyntheticEvent): Promise<void> => {
      e.preventDefault();
      const values = getValues()

      sentComments(values)
    };

    return (
      <div id='content-comments' className="flex flex-col w-full overflow-hidden xxxs:h-[250px] sm:h-[320px]" style={{borderRadius: '0 0 20px 20px'}}>
        <div id='content-comments-scroll'  className={`overflow-y-scroll ${theme?.entry.thirdBgColor} border border-gray-20 px-2`}>
          {comments?.map((comment: CommentType, index: number) => (
            (comment.user.id === userStored.id
              ? <div className="w-full flex items-center justify-end py-2 " key={`comment_${comment.id}-${index}`}>
                  <div className="flex-grow flex flex-col items-end mr-2">
                    <strong>{comment.user.fullName}</strong>
                    <p className="text-gray-500 mr-2">{comment.message}</p>
                  </div>
                  <div className="w-[3rem] h-[3rem] bg-gray-300 rounded-full  flex items-center justify-center">{comment.user.initials}</div>
                </div>
              :  <div className="flex items-center py-2 " key={`comment_${comment.id}-${index}`}>
                  <div className="w-[3.5rem] h-[3rem] bg-gray-300 rounded-full mr-4  flex items-center justify-center">{comment.user.initials}</div>
                  <div className='w-full flex-grow flex flex-col items-start mr-2'>
                    <strong>{comment.user.fullName}</strong>
                    <p className="text-gray-500">{comment.message}</p>
                  </div>
                </div>
            )
          ))}
        </div>
          <form
            target="_blank"
            onSubmit={onSubmit}
            method="POST"
            className=""
          >
           <div id='comment-form-content'
              className={`
              min-w-[100px] flex md:flex-row sm:flex-row xxxs:flex-col xxs:flex-col justify-between items-center gap-3 py-3 px-3
              ${theme?.entry.secondaryBgColor}`}
              style={{borderRadius: '0 0 20px 20px'}}
            >
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
                  type="hidden"
                  value={entry_id}
                  {...register("entry_id")}
                />
                <input
                  type="text"
                  id="messageInput"
                  autoComplete='off'
                  placeholder="Escribe tu mensaje..."
                  className="mr-4 p-1 border rounded-lg focus:outline-none
                  w-full
                  "
                  {...register("message", {
                    required: true,
                    minLength: 1,
                  })}
                />
                {errors.message && (
                  <p className="mt-1 text-primary-500">
                    {errors.message.type === "required" && "This field is required."}
                    {errors.message.type === "maxLength" &&
                      "This field is empry."}
                  </p>
                )}
              </div>
              <button type="submit"
                disabled={loading}
                className={`
                xxxs:w-full xxs:w-full md:w-auto lg:w-auto px-4 py-1
                text-white-01 rounded-lg
                ${theme?.general.primaryBgColor} ${theme?.general.primaryBgColorHover}
                `}
                style={{alignSelf: 'end'}}>
                  Enviar
              </button>
            </div>
          </form>
      </div>
    )
};

export default Comments;

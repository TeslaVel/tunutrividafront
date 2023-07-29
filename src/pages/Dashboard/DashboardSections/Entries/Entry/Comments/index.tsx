import { useForm } from "react-hook-form";

// types
import { UserType, CommentType, UserColors } from '@/types'

interface IProps {
  userStored: UserType
  userColors: UserColors
  entry_id: string
  comments: CommentType[]
  sentComments: (values: any) => Promise<void>
  loading: boolean
}

export const Comments = ({sentComments, entry_id, comments, userStored, userColors, loading}: IProps) => {
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
      <div id='content-comments' className="flex flex-col w-full overflow-hidden " style={{borderRadius: '0 0 20px 20px'}}>
        <div id='content-comments-scroll'  className="overflow-y-scroll bg-gray-10 border border-gray-20 px-2" style={{borderRadius: '20px 20px 0 0 '}}>
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
        <div id='comment-form-content' className={`flex justify-between items-center pb-3 px-3 ${userColors?.entry.secondaryBgColor}`} style={{borderRadius: '0 0 20px 20px'}}>
          <form
            target="_blank"
            onSubmit={onSubmit}
            method="POST"
            className="flex justify-between items-center w-full"
          >
          <div className="flex flex-grow flex-col" >
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
                className="mr-4 p-1 border rounded-lg focus:outline-none"
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
              className="px-4 py-1 bg-primary-female-700 hover:bg-pink-400 text-white rounded-lg"
              style={{alignSelf: 'end'}}>Enviar
            </button>
          </form>
        </div>
      </div>
    )
};

export default Comments;

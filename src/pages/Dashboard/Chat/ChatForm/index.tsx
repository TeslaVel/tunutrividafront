import { useEffect } from "react";

import { UserType, ConversationType, CommentType } from "@/types";
import { useMutationCreateNote } from '@/hooks/graph/useMutationCreateNote'
import { useForm } from "react-hook-form"

interface Props {
  refetchConversation: () => void
  conversation: ConversationType
  userStored: UserType | null;
}

export const ChatForm = ({userStored, conversation, refetchConversation}: Props) => {
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


  const createAction = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const values = {
      conversation_id: conversation.id,
      ...getValues()
    }
    console.log('values', values)

    const { data } = await CreateNote({ variables: values }) || {};
    if (error) {
      console.log(error)
    }
    else if (data && data.createNote) {
      refetchConversation();
      reset()
      // const messageField = document.getElementById('message') as HTMLInputElement;
      // messageField.value=''
    }
  };

  return (
    <div className="flex flex-col mx-[5rem] mt-[5rem]" >
      <div
        className="flex flex-col w-full overflow-hidden h-[50vh] border border-purple-300 bg-purple-01"
        style={{borderRadius: '20px 20px 0 0 '}}>
        <div  id='content-note-scroll'  className="overflow-y-scroll px-2">
          {notes?.map((comment: CommentType, index: number) => (
            (userStored && userStored.id === comment.user.id
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
      </div>

      <form
        target="_blank"
        onSubmit={createAction}
        method="POST"
        id="form-create-note"
      >
        <div className="flex justify-between items-center pb-3 pt-8 px-3 bg-purple-300">
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
              {...register("message", {
                required: true,
                minLength: 1,
              })}
              id='message'
              type="text"
              placeholder="Escribe tu mensaje..."
              className="mr-4 p-1 border rounded-lg focus:outline-none" />
          </div>
          <button className="px-4 py-1 bg-blue-500 text-white rounded-lg" style={{alignSelf: 'end'}}>Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default ChatForm;



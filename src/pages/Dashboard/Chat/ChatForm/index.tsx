// types
import { UserType, ConversationType, CommentType } from "@/shared/types";

interface Props {
  conversation: ConversationType
  userStored: UserType | null;
}

export const ChatForm = ({userStored, conversation}: Props) => {
  const inserEmoji = (emoji: string) => {
    const inputField = document.getElementById('messageInput') as HTMLInputElement;

    if (inputField !== null) {
      inputField.value += ` ${emoji}`;
    }
  }

  const notes = conversation?.notes

  return (
    <div className="flex flex-col mx-[5rem] mt-[5rem]" >
      <div
        className="flex flex-col w-full overflow-hidden h-[50vh] bg-primary-100"
        style={{borderRadius: '20px 20px 0 0 '}}>
        <div  id='content-comments-scroll'  className="overflow-y-scroll px-2">
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

      <div className="flex justify-between items-center pb-3 pt-8 px-3 bg-primary-200">
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
            id="messageInput"
            type="text"
            placeholder="Escribe tu mensaje..."
            className="mr-4 p-1 border rounded-lg focus:outline-none" />
        </div>
        <button className="px-4 py-1 bg-blue-500 text-white rounded-lg" style={{alignSelf: 'end'}}>Enviar</button>
      </div>
    </div>
  );
}

export default ChatForm;



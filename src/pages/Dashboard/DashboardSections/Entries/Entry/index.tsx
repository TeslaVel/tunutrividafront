import { useState } from 'react'
import { EntryType, UserType, CommentType } from '@/shared/types'
import { Comments } from './Comments'
import { useMutationCreateComment } from '@/hooks/graph/useMutationCreateComment';

type Props = {
  userStored: UserType;
  entry: EntryType;
  showComments: Boolean;
  isList: Boolean;
  setAction?: (entry: EntryType) => void;
};

const klasses = 'entries flex flex-col bg-primary-100 gap-3 border rounded-lg p-4 mb-8 xss:w-6/6 xs:w-6/6 sm:w-5/6 md:w-5/6 lg:w-3/6'

export const Entry = ({ entry, isList, setAction, showComments, userStored }: Props) => {
    const [commentList, setCommentList] = useState<CommentType[]>(entry.comments);
    const { CreateComment, data, loading, error, reset } = useMutationCreateComment();
    if (error) {
      console.log('errores', error)
    }
    const injectdStyles = {
      borderRadius: '20px',
      cursor: 'auto'
    }

    if (isList) injectdStyles.cursor = 'pointer'

    const sentComments = async (values: any): Promise<void> => {
      const { data } = await CreateComment({ variables: values }) || {};
      if (error) {
        console.log(error)
      }
      else if (data && data.createComment) {
        setCommentList((prevComments) => [...prevComments, data.createComment]);
        const myDiv = document.getElementById('content-comments-scroll')
        if (myDiv) {
          setTimeout(() => {
            myDiv.scrollTop = myDiv.scrollHeight;
          }, 2);
        }
        const inputText = document.getElementById('messageInput') as HTMLInputElement
        if (inputText) { inputText.value = ''}
      }
      console.log('data.createComment', data.createComment)
    };

    return (
      <div
          onClick={
            isList
            ? () => setAction && setAction(entry)
            : () => {}
          }
          className={klasses}
          style={injectdStyles}
        >
        <div className="flex items-center">
          <div>
            <span className="w-[3rem] h-[3rem] bg-secondary-500 rounded-full mr-4  flex items-center justify-center"></span>
          </div>
          <div>
            <p className="text-lg font-bold">{entry.user.fullName }</p>
            <p className="text-sm ">{entry.createdAt }</p>
          </div>
        </div>
        { entry.imageUrl !== null && entry.imageUrl.length > 0 &&
          <div className="border-b ">
              <img src={entry.imageUrl} alt={entry.entryType} className="w-full h-[250px]" />
          </div>
        }
        <div className="py-3 px-4 h-[80px] h-auto" style={{
          borderRadius: '10px',
          border: '1px #bb96a2 solid',
          background: 'rgb(241, 236, 243) '}}>
          <p className="text-gray-500">{entry.description}</p>
        </div>
        <h2 className="text-lg font-bold  mt-3 mb-2">Comentarios {commentList.length}</h2>
        {showComments && commentList.length > 0 &&
          <div className="flex flex-col justify-between  bg-gray-20 w-full flex flex-col overflow-hidden h-[250px] pt-2" style={{borderRadius: '20px'}}>
            <Comments
              sentComments={sentComments}
              loading={loading}
              userStored={userStored}
              entry_id={entry.id}
              comments={commentList} />
          </div>
        }
      </div>
    )
};

export default Entry;

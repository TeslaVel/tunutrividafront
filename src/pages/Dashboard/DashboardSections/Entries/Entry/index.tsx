import { useState } from 'react'
import { EntryType, UserType, CommentType } from '@/types'
import { Comments } from './Comments'
import { useMutationCreateComment } from '@/hooks/graph/useMutationCreateComment';
import { customDateFormat } from '@/components/utils/TimeUtils'

type Props = {
  userStored: UserType;
  entry: EntryType;
  showComments: Boolean;
  isList: Boolean;
  setAction?: (entry: EntryType) => void;
};


export const Entry = ({ entry, isList, setAction, showComments, userStored }: Props) => {
    const klasses = `entries relative flex flex-col flex-wrap bg-primary-20 mb-8 ${isList ? 'min-w-[300px] w-[350px] ' : 'xxs:w-6/6 xs:w-6/6 sm:w-5/6 md:w-5/6 lg:w-3/6'}`
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

    const hasImage = entry.imageUrl !== null && entry.imageUrl.length > 0

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
        <div className="flex items-center p-4 bg-primary-100" style={{borderRadius: '20px 20px 0 0'}}>
          <div>
            <span className="w-[3rem] h-[3rem] bg-secondary-500 rounded-full mr-4 flex items-center justify-center"></span>
          </div>
          <div>
            <p className="text-lg font-bold">{entry.user.fullName }</p>
            <p className="text-sm ">{customDateFormat(entry.createdAt, 'LL HH:mm') }</p>
          </div>
        </div>
        { hasImage &&
          <div className="border-b p-3">
              <img src={entry.imageUrl} alt={entry.entryType} className={`w-full ${isList ? 'h-[200px]' : 'h-[250px]'}`} />
          </div>
        }
        <div className="w-full h-[60px] p-3"
          style={{}}
        >
          <p className="text-gray-500">{entry.description}</p>
        </div>
        <div className={`flex justify-end px-4 py-3 ${isList && !hasImage ? 'absolute bottom-0 right-0' : ''}`}>
          <button className={`p-1 ${isList && 'bg-primary-400 hover:bg-primary-500 text-white rounded-lg'}`}>
            Comentarios ({commentList.length})
          </button>
        </div>
        {showComments && commentList.length > 0 &&
          <Comments
            sentComments={sentComments}
            loading={loading}
            userStored={userStored}
            entry_id={entry.id}
            comments={commentList} />
        }
      </div>
    )
};

export default Entry;

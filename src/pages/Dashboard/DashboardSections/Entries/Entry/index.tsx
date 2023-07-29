import { useState } from 'react'
import { Comments } from './Comments'
import { useMutationCreateComment } from '@/hooks/graph/useMutationCreateComment';
import { customDateFormat } from '@/components/utils/TimeUtils'

//
import { EntryType, UserType, CommentType, UserColors } from '@/types'

type Props = {
  userStored: UserType
  userColors: UserColors
  entry: EntryType
  showComments: Boolean
  isList: Boolean
  setAction?: (entry: EntryType) => void
}


export const Entry = ({ entry, isList, setAction, showComments, userStored, userColors }: Props) => {
    const entryClasses = `entries relative flex flex-col flex-wrap
    ${userColors?.general.baseBgColor} ${userColors?.entry.border} ${isList ? 'w-full' : 'xxxs:xxs:sm:w-6/6 md:w-5/6 lg:w-3/6'}`;

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
          className={entryClasses}
          style={injectdStyles}
        >
        <div className={`flex items-center p-4 ${userColors?.entry.secondaryBgColor} text-white-01`} style={{borderRadius: '20px 20px 0 0'}}>
          <div>
            <span className={`w-[3rem] h-[3rem] ${userColors?.entry.primaryBgColor} rounded-full mr-4 flex items-center justify-center`}></span>
          </div>
          <div>
            <p className="text-lg font-bold">{entry.user.fullName }</p>
            <p className="text-sm ">{customDateFormat(entry.createdAt, 'LL HH:mm') }</p>
          </div>
        </div>
        { hasImage && !isList &&
          <div className="border-b p-3">
              <img src={entry.imageUrl} alt={entry.entryType} className={`w-full ${isList ? 'h-[200px]' : 'h-[250px]'}`} />
          </div>
        }
        <div className="w-full min-h-[60px] p-3"
          style={{}}
        >
          <p className="px-2">{entry.description}</p>
        </div>
        <div className={`flex justify-end px-4 pb-2 pt-1 ${isList && !hasImage ? '' : ''}`}>
          Comentarios ({commentList.length})
        </div>
        {showComments && commentList.length > 0 &&
          <Comments
            sentComments={sentComments}
            userColors={userColors}
            loading={loading}
            userStored={userStored}
            entry_id={entry.id}
            comments={commentList} />
        }
      </div>
    )
};

export default Entry;

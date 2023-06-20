import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/AuthProviderManager';
import { UseGetConversation } from '@/hooks/useGetConversation'
import Scroller from '@/components/Scroller'
import ChatForm from './ChatForm'
import { CreateConversationForm } from './CreateConversationForm'
// types
import { SelectedPage, CommentType } from "@/types";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};


export const Chat = ({setSelectedPage }: Props) => {
  const { userStored } = useContext(AuthContext);
  const { loading, data, refetch } = UseGetConversation()
  const [isOpenAside, setIsOpenAside] = useState<boolean>(false)

  useEffect(() => {
    setSelectedPage(SelectedPage.Chat)
    refetch()
  }, []);


  const refetchConversation = () => {
    refetch()
  }

  const conversation = data?.conversation

  return (
    <>
      <Scroller scrollerName='sessions'>
        <section id="chat" className="py-3 px-5 w-full">
          <>
          { loading
            ? <div>Cargando...</div>
            : <>
              { conversation &&
                <ChatForm
                  refetchConversation={refetchConversation}
                  conversation={conversation}
                  userStored={userStored}
                />
              }

              { !conversation &&
                <div className="flex justify-center p-[70px]">
                  <button onClick={() => setIsOpenAside(true)} className="px-3 py-1 bg-purple-30 hover:bg-purple-100 text-white rounded-lg">
                    Crear Nueva Conversación
                  </button>
                </div>
              }
            </>
          }
          </>
        </section>
      </Scroller>
      <CreateConversationForm
        userStored={userStored}
        isOpenAside={isOpenAside}
        setIsOpenAside={setIsOpenAside}
        refetchConversation={refetchConversation}
      />
    </>
  );
}

export default Chat;

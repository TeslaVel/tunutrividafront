import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/AuthProviderManager';
import { UseGetConversation } from '@/hooks/useGetConversation'
import Scroller from '@/components/Scroller/Scroller'
import ChatForm from './ChatForm'
import { CreateConversationForm } from './CreateConversationForm'

// types
import { SelectedPage, UserColors } from "@/types";

type Props = {
  userColors: UserColors
  setSelectedPage: (value: SelectedPage) => void;
};

export const Chat = ({setSelectedPage, userColors }: Props) => {
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
        <section id="chat" className="
          xxxs:pt-5 xxs:pt-5 lg:pt-[5rem] md:pt-[5rem] w-full
          xxxs:px-2 xxs:px-2 xs:px-4 sm:px-4 md:px-5 lg:px-5
          xxxs:w-full xxs:w-full xs:w-full sm:w-full md:w-5/6 lg:w-5/6 m-auto
          ">
          <>
          { loading
            ? <div>Cargando...</div>
            : <>
              { conversation &&
                <ChatForm
                  refetchConversation={refetchConversation}
                  conversation={conversation}
                  userStored={userStored}
                  userColors={userColors}
                />
              }

              { !conversation &&
                <div className="flex justify-center p-[70px]">
                  <button onClick={() => setIsOpenAside(true)} className={`px-3 py-1 ${userColors?.general.primaryBgColor} ${userColors?.general.primaryBgColorHover} text-white rounded-lg`}>
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
        userColors={userColors}
        isOpenAside={isOpenAside}
        setIsOpenAside={setIsOpenAside}
        refetchConversation={refetchConversation}
      />
    </>
  );
}

export default Chat;

import { useEffect, useState, useContext } from "react"
import { AuthContext } from '@/AuthProviderManager'
import { UseGetConversation } from '@/hooks/useGetConversation'
import Scroller from '@/components/Scroller/Scroller'
import actioncable from 'actioncable'
import ChatForm from './ChatForm'
import { Loading } from '@/components/Loading'
import { CreateConversationForm } from './CreateConversationForm'

// types
import { SelectedPage, UserColors } from "@/types"

type Props = {
  userColors: UserColors
  setSelectedPage: (value: SelectedPage) => void;
};
const VITE_SOCKET_SERVER = import.meta.env.VITE_APP_WEB_SOCKET
const cable: any = actioncable.createConsumer(VITE_SOCKET_SERVER)

export const Chat: React.FC<Props> = ({setSelectedPage, userColors }: Props) => {
  const { userStored } = useContext(AuthContext)
  const { loading, data, refetch } = UseGetConversation()
  const [isOpenAside, setIsOpenAside] = useState<boolean>(false)

  if (!userStored) return null

  useEffect(() => {
    setSelectedPage(SelectedPage.Chat)
    refetch()

    const channel = cable.subscriptions.create({ channel: 'DietitianEvents', dietitian_id: userStored.dietitianId }, {
      received: (data: {[key: string]: string }) => {
        if (data.event_emitter === 'dietitian') {
          console.log('received', data);
          refetch()
        }
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleCableAction = (conversation_id: string | null = null) => {
    if (conversation_id ===  null || conversation_id === undefined) return

    cable.subscriptions.subscriptions[0].send({conversation_id: conversation_id});
  };

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
          xxxs:w-full xxs:w-full xs:w-full sm:w-full md:w-5/6 lg:w-5/6 mx-auto
          ">
          <>
          { loading &&
            <Loading
              width={45}
              height={45}
              fillColor={userColors.general.fillSvgColorPrimary}
            />
          }
          { !loading &&
            <>
              { conversation &&
                <ChatForm
                  refetchConversation={refetchConversation}
                  conversation={conversation}
                  userStored={userStored}
                  userColors={userColors}
                  handleCableAction={handleCableAction}
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

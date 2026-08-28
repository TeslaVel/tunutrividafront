import { useEffect, useState, useContext } from "react"
import { AuthContext } from '@/AuthProviderManager'
import { useGetConversation } from '@/hooks/useGetConversation'
import Scroller from '@/components/Scroller/Scroller'
import DashboardPageLayout from '@/components/DashboardPageLayout'
import actioncable from 'actioncable'
import ChatForm from './ChatForm'
import { Loading } from '@/components/Loading'
import { CreateConversationForm } from './CreateConversationForm'

// types
import { SelectedPage, ThemeType } from "@/types"

type Props = {
  theme: ThemeType
  setSelectedPage: (value: SelectedPage) => void;
};
const VITE_SOCKET_SERVER = import.meta.env.VITE_APP_WEB_SOCKET
const cable: any = actioncable.createConsumer(VITE_SOCKET_SERVER)

export const Chat: React.FC<Props> = ({setSelectedPage, theme }: Props) => {
  const { userStored } = useContext(AuthContext)
  const { loading, data, refetch } = useGetConversation()
  const [isOpenAside, setIsOpenAside] = useState<boolean>(false)

  // Antes había un `if (!userStored) return null` ACÁ, antes de este
  // useEffect — eso viola las Rules of Hooks (la cantidad de hooks
  // llamados cambiaría entre renders según userStored). El early return
  // ahora va después de todos los hooks, justo antes del JSX.
  useEffect(() => {
    if (!userStored) return

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
  }, [userStored]);

  const handleCableAction = (conversation_id: string | null = null) => {
    if (conversation_id ===  null || conversation_id === undefined) return

    cable.subscriptions.subscriptions[0].send({conversation_id: conversation_id});
  };

  const refetchConversation = () => {
    refetch()
  }

  const conversation = data?.conversation

  if (!userStored) return null

  return (
    <>
      <Scroller scrollerName='sessions'>
        <DashboardPageLayout id="chat" className="pt-5 md:pt-[5rem]">
          <>
          { loading &&
            <Loading
              width={45}
              height={45}
              fillColor={theme.general.fillSvgColorPrimary}
            />
          }
          { !loading &&
            <>
              { conversation &&
                <ChatForm
                  refetchConversation={refetchConversation}
                  conversation={conversation}
                  userStored={userStored}
                  theme={theme}
                  handleCableAction={handleCableAction}
                />
              }

              { !conversation &&
                <div className="flex flex-col items-center gap-4 py-16">
                  <p className="text-gray-400">Todavía no tenés ninguna conversación.</p>
                  <button onClick={() => setIsOpenAside(true)} className={`px-4 py-2 ${theme?.general.primaryBgColor} ${theme?.general.primaryBgColorHover} text-white rounded-lg`}>
                    Crear nueva conversación
                  </button>
                </div>
              }
            </>
          }
          </>
        </DashboardPageLayout>
      </Scroller>
      <CreateConversationForm
        userStored={userStored}
        theme={theme}
        isOpenAside={isOpenAside}
        setIsOpenAside={setIsOpenAside}
        refetchConversation={refetchConversation}
      />
    </>
  );
}

export default Chat;

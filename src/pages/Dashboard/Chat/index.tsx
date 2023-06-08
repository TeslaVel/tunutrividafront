import { useEffect, useContext } from "react";
import Scroller from '@/components/Scroller'
import ChatForm from './ChatForm'
import { AuthContext } from '@/AuthProviderManager';
import { UseGetConversation } from '@/hooks/useGetConversation'
// types
import { SelectedPage, CommentType } from "@/shared/types";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};


const comments: CommentType[] = [
  {
    id: '1',
    message: 'Hola que tal',
    createdAt: '17/03/2023 10:50 am',
    user: {
      id: '1',
      firstName: 'Juan Perez',
      firstNameInitial: 'Juan P',
      fullName: 'Juan',
      initials: 'JP'
    }
  },
  {
    id: '2',
    message: 'Muy bien como te va ',
    createdAt: '17/03/2023 10:50 am',
    user: {
      id: '10',
      firstName: 'Tesla Vel',
      firstNameInitial: 'Tesla V',
      fullName: 'Tesla',
      initials: 'TV'
    }
  }
]

export const Chat = ({setSelectedPage }: Props) => {
  const { userStored } = useContext(AuthContext);
  const { loading, data, refetch } = UseGetConversation()

  useEffect(() => {
    setSelectedPage(SelectedPage.Chat)
  }, []);

  const conversation = data?.conversation

  return (
    <Scroller scrollerName='sessions'>
      <section id="chat" className="py-3 px-5 w-full">
        <ChatForm
          conversation={conversation}
          userStored={userStored}
        />
      </section>
    </Scroller>
  );
}

export default Chat;

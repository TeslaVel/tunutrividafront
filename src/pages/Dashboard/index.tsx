import { useEffect, useState, useContext } from "react";
import actioncable from 'actioncable';
import DashboardSections from './DashboardSections';
import TopBar from './TopBar';
import { AuthContext } from '@/AuthProviderManager';
import Scroller from '@/components/Scroller/Scroller'

// types
import { SelectedPage, UserColors } from "@/types";

type Props = {
  selectedPage: SelectedPage
  userColors: UserColors
  setSelectedPage: (value: SelectedPage) => void;
  asignCLientForUploadImage: () => void;
  dietitian_id?: string;
};

const VITE_SOCKET_SERVER = import.meta.env.VITE_APP_WEB_SOCKET
const cable = actioncable.createConsumer(VITE_SOCKET_SERVER);

export const Dashboard = ({setSelectedPage, dietitian_id, userColors, asignCLientForUploadImage}: Props) => {
  const { userStored } = useContext(AuthContext);
  const [optionSelected, setOptionSelected] = useState<string>('dashboard')

  useEffect(() => {
    setSelectedPage(SelectedPage.Dashboard)

    const channel = cable.subscriptions.create({ channel: 'GlobalEvents', dietitian_id: dietitian_id }, {
      received: (data: any) => {
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleCableAction = () => {
    const message = { text: 'Este es un mensaje desde el front!' };
    console.log('cable', cable)
    // cable.subscriptions.subscriptions[0].send({ message });
  };

  return (
    <>
      <Scroller
        scrollerName='profile'
        header={
          <TopBar
            optionSelected={optionSelected}
            setOptionSelected={setOptionSelected}
            userColors={userColors}
            />
        }
      >
        <section id="profile" className="
          xxxs:px-1 xxs:px-1 xs:px-4 sm:px-4 md:px-5 lg:px-5
          xxxs:w-full xxs:w-full xs:w-full sm:w-full md:w-5/6 lg:w-5/6 m-auto
        " >
          <DashboardSections
            asignCLientForUploadImage={asignCLientForUploadImage}
            userStored={userStored}
            userColors={userColors}
            optionSelected={optionSelected}
            handleCableAction={handleCableAction}
          />
        </section>
      </Scroller>
    </>
  );
}

export default Dashboard;

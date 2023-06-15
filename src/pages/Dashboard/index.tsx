import { useEffect, useState, useContext } from "react";
import actioncable from 'actioncable';
import DashboardSections from './DashboardSections';
import TopBar from './TopBar';
import { AuthContext } from '@/AuthProviderManager';
import Scroller from '@/components/Scroller'

// types
import { SelectedPage } from "@/shared/types";

type Props = {
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void;
  asignCLientForUploadImage: () => void;
  dietitian_id?: string;
};

const cable = actioncable.createConsumer('ws://localhost:3001/cable');

export const Dashboard = ({setSelectedPage, dietitian_id, asignCLientForUploadImage}: Props) => {
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
            />
        }
      >
        <section id="profile" className="py-3 px-5 sm:px-5 xxs:px-3 xxxs:px-1 w-full" >
          <DashboardSections
            asignCLientForUploadImage={asignCLientForUploadImage}
            userStored={userStored}
            optionSelected={optionSelected}
            handleCableAction={handleCableAction}
          />
        </section>
      </Scroller>
    </>
  );
}

export default Dashboard;

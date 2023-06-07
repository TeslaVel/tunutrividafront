import { useEffect, useState, useContext } from "react";
import actioncable from 'actioncable';
import DashboardSections from './DashboardSections';
import TopBar from './TopBar';
import { AuthContext } from '@/AuthProviderManager';

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
      <section id="profile" className="py-3 px-3 md:h-full md:pb-0">
          <div className="topbar topbar gap-5 flex mb-5 fixed">
            <TopBar
              optionSelected={optionSelected}
              setOptionSelected={setOptionSelected}
             />
          </div>
          <div className="pt-12 entry-list-content w-full flex flex-col items-center overflow-hidden" >
            <div className='flex mt-5 dashboard-scroller w-full flex overflow-y-scroll' id='dashboard-scroller' style={{height: '90vh'}}>
              <DashboardSections
                asignCLientForUploadImage={asignCLientForUploadImage}
                userStored={userStored}
                optionSelected={optionSelected}
                handleCableAction={handleCableAction}
              />
            </div>
          </div>
      </section>
    </>
  );
}

export default Dashboard;

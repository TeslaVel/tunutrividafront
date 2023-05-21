import { useEffect, useState } from "react";
import { SelectedPage, UserType } from "@/shared/types";
import actioncable from 'actioncable';
import DashboardSections from './DashboardSections';
import TopBar from './TopBar';

type Props = {
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void;
  dietitian_id?: string;
};

const cable = actioncable.createConsumer('ws://localhost:3001/cable');

export const Dashboard = ({setSelectedPage, dietitian_id }: Props) => {
  const [optionSelected, setOptionSelected] = useState<string>('Dashboard')

  useEffect(() => {
    setSelectedPage(SelectedPage.Dashboard)

    const channel = cable.subscriptions.create({ channel: 'GlobalEvents', dietitian_id: dietitian_id }, {
      received: (data: any) => {
       console.log(data)
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
      <section id="profile" className="bg-gray-20 py-3 px-3 md:h-full md:pb-0">
          <div className="topbar topbar gap-5 flex mb-5 fixed">
            <TopBar
              optionSelected={optionSelected}
              setOptionSelected={setOptionSelected}
             />
          </div>
          <div className="pt-12 md:h-5/6" >
           <DashboardSections
            optionSelected={optionSelected}
            handleCableAction={handleCableAction}
           />
          </div>
      </section>
    </>
  );
}

export default Dashboard;

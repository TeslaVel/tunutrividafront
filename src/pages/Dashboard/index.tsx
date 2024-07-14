import { useEffect, useState, useContext } from "react";
import DashboardSections from './DashboardSections';
import TopBar from './TopBar';
import { AuthContext } from '@/AuthProviderManager';
import Scroller from '@/components/Scroller/Scroller'

// types
import { SelectedPage, ThemeType } from "@/types";

type Props = {
  selectedPage: SelectedPage
  theme: ThemeType
  setSelectedPage: (value: SelectedPage) => void;
  asignCLientForUploadImage: () => void;
};

// const VITE_SOCKET_SERVER = import.meta.env.VITE_APP_WEB_SOCKET
// const cable = actioncable.createConsumer(VITE_SOCKET_SERVER);

export const Dashboard: React.FC<Props> = ({setSelectedPage, theme, asignCLientForUploadImage}: Props) => {
  const { userStored } = useContext(AuthContext);
  const [optionSelected, setOptionSelected] = useState<string>('dashboard')

  useEffect(() => {
    setSelectedPage(SelectedPage.Dashboard)
  }, []);

  return (
    <>
      <Scroller
        scrollerName='profile'
        header={
          <TopBar
            optionSelected={optionSelected}
            setOptionSelected={setOptionSelected}
            theme={theme}
            />
        }
      >
        <section id="profile" className="
          xxxs:px-1 xxs:px-1 xs:px-4 sm:px-4 md:px-5 lg:px-5
          xxxs:w-full xxs:w-full xs:w-full sm:w-full md:w-5/6 lg:w-5/6 mx-auto
        " >
          <DashboardSections
            asignCLientForUploadImage={asignCLientForUploadImage}
            userStored={userStored}
            theme={theme}
            optionSelected={optionSelected}
          />
        </section>
      </Scroller>
    </>
  );
}

export default Dashboard;

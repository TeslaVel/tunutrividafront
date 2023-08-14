import { useContext, useState, useEffect, Suspense, useRef } from 'react';
import Head from "@/pages/Landing/Head";
import ProtectedRoute from '@/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import Sessions from '@/pages/Dashboard/Sessions';
import Appointments from '@/pages/Dashboard/Appointments';
import Chat from '@/pages/Dashboard/Chat';
import NotFound from '@/pages/NotFound';
// import { colorByGender } from '@/components/utils/GeneralUtils'

import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import Landing from "@/pages/Landing";
import { AuthContext } from '@/AuthProviderManager';

// types
import { SelectedPage } from "@/types";

type Props = {
  // selectedPage: SelectedPage
  // setSelectedPage: (value: SelectedPage) => void;
  asignCLientForUploadImage: () => void;
};

export const AppRoutes: React.FC<Props> = ({ asignCLientForUploadImage}: Props) => {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Landing);
  const scrollRef = useRef<number | null>(null);
  const { userStored, userColors } = useContext(AuthContext);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const selectAndCenterPage = (selected: SelectedPage, center: boolean | undefined = false) => {
    setSelectedPage(selected)

    if(!center) return

    const element = document.getElementById(selected);

    if (element && selectedPage !== SelectedPage.LogIn) {
      // Cancelar el desplazamiento anterior si existe
      if (scrollRef.current) {
        window.cancelAnimationFrame(scrollRef.current);
      }

      // Realizar el nuevo desplazamiento
      const scroll = () => {
        element.scrollIntoView({ behavior: 'smooth' });
      };
      scrollRef.current = window.requestAnimationFrame(scroll);
    }
  }

  const isLogged = !(userStored == undefined || userStored == null || userStored?.token?.length < 1 && userStored.dietitianId)
  const sectionNotVisible = ['terms', 'policies'].includes(selectedPage)

  return (
    <>
      <Suspense fallback={<div />}>
        <BrowserRouter>
          <div className={`${isLogged ? 'flex min-h-screen' : ''}`}>
            <Head
              userColors={userColors}
              isLogged={isLogged}
              isTopOfPage={isTopOfPage}
              selectedPage={selectedPage}
              setSelectedPage={selectAndCenterPage}
            />

            <div className={`${isLogged ? `flex-1 h-[100%] ${userColors?.general.baseBgColor} ${userColors?.general.baseTextColor}` : ''}`} id='routes-content'>
              <Routes>
                <Route element={<ProtectedRoute isNotLogged={isLogged} redirectPath="/dashboard" />}>
                  <Route index path="/" element={
                    <Landing
                      sectionNotVisible={sectionNotVisible}
                      selectedPage={selectedPage}
                      setSelectedPage={selectAndCenterPage} />
                  }/>
                </Route>


                { isLogged && userColors &&
                  <Route element={<ProtectedRoute isNotLogged={!isLogged} redirectPath="/" />}>
                    <Route path="/dashboard" element={
                      <Dashboard
                        asignCLientForUploadImage={asignCLientForUploadImage}
                        selectedPage={selectedPage}
                        userColors={userColors}
                        setSelectedPage={selectAndCenterPage}/>
                    }/>

                    <Route path="/sessions" element={
                      <Sessions
                        userColors={userColors}
                        setSelectedPage={selectAndCenterPage}/>
                    }/>
                    <Route path="/chat" element={
                      <Chat
                        userColors={userColors}
                        setSelectedPage={selectAndCenterPage}/>
                    }/>

                    <Route path="/appointments" element={
                      <Appointments
                        userColors={userColors}
                        setSelectedPage={selectAndCenterPage}
                      />
                    }/>
                  </Route>
                }

                <Route element={<ProtectedRoute isNotLogged={!isLogged} redirectPath="/" />}>
                  <Route path='*' element={<NotFound setSelectedPage={selectAndCenterPage} />} />
                </Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter >
      </Suspense>
    </>
  );
}

export default AppRoutes;

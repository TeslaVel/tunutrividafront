import { useContext, useState, useEffect, Suspense } from 'react';
import Menu from "@/components/Menu";
import ProtectedRoute from '@/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import Sessions from '@/pages/Dashboard/Sessions';
import Appointments from '@/pages/Dashboard/Appointments';
import Chat from '@/pages/Dashboard/Chat';
import NotFound from '@/pages/NotFound';

import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import Landing from "@/pages/Landing";
import { SelectedPage } from "@/shared/types";
import { AuthContext } from '@/AuthProviderManager';

type Props = {
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void;
  asignCLientForUploadImage: () => void;
};

export const AppRoutes = ({ selectedPage, setSelectedPage, asignCLientForUploadImage}: Props) => {
  const { userStored } = useContext(AuthContext);

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

  const isLogged = !(userStored == undefined || userStored == null || userStored?.token?.length < 1 && userStored.dietitianId)

  return (
    <>
      <Suspense fallback={<div />}>
        <BrowserRouter>
          <div className={`${isLogged ? 'flex min-h-screen' : 'gray-purple-20'}`}>
            <Menu
              isLogged={isLogged}
              isTopOfPage={isTopOfPage}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />

            <div className={`${isLogged ? 'flex-1 bg-primary-50 h-[100%] bg-primary-50' : ''}`}>
              <Routes>
                <Route element={<ProtectedRoute isNotLogged={isLogged} redirectPath="/dashboard" />}>
                  <Route index path="/" element={
                    <Landing selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                  }/>
                </Route>

                <Route element={<ProtectedRoute isNotLogged={!isLogged} redirectPath="/" />}>
                  <Route path="/dashboard" element={
                    <Dashboard
                      asignCLientForUploadImage={asignCLientForUploadImage}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                      dietitian_id={userStored?.dietitianId} />
                  }/>

                  <Route path="/sessions" element={
                    <Sessions
                      setSelectedPage={setSelectedPage}/>
                  }/>
                  <Route path="/chat" element={
                    <Chat
                      setSelectedPage={setSelectedPage}/>
                  }/>

                  <Route path="/appointments" element={
                    <Appointments setSelectedPage={setSelectedPage}/>
                  }/>
                </Route>

                <Route element={<ProtectedRoute isNotLogged={!isLogged} redirectPath="/" />}>
                  <Route path='*' element={<NotFound setSelectedPage={setSelectedPage} />} />
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

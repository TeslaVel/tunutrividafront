import { useContext, useState, useEffect, Suspense } from 'react';
import Menu from "@/components/Menu";
import ProtectedRoute from '@/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import Appointments from '@/pages/Appointments';
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
};

export const AppRoutes = ({ selectedPage, setSelectedPage }: Props) => {
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

  const isLogged = !(userStored == null || userStored.token.length < 1)

  return (
    <>
      <Suspense fallback={<div />}>
        <BrowserRouter>
          <div className={`${isLogged ? 'flex min-h-screen' : ''}`}>
            <Menu
              isLogged={isLogged}
              isTopOfPage={isTopOfPage}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />

            <div className={`${isLogged ? 'flex-1' : ''}`}>
              <Routes>
                <Route element={<ProtectedRoute isLogged={isLogged} redirectPath="/dashboard" />}>
                  <Route index path="/" element={
                    <Landing selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                  }/>
                </Route>

                <Route element={<ProtectedRoute isLogged={!isLogged} redirectPath="/" />}>
                  <Route path="/dashboard" element={
                    <Dashboard
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                      dietitian_id={userStored?.dietitianId} />
                  }/>

                  <Route path="/appointments" element={
                    <Appointments setSelectedPage={setSelectedPage}/>
                  }/>
                </Route>

                <Route element={<ProtectedRoute isLogged={!isLogged} redirectPath="/" />}>
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

import { useContext, useState, useEffect, Suspense } from 'react';
import Menu from "@/components/menu";
import ProtectedRoute from '@/ProtectedRoute';
import Profile from '@/pages/Profile';
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
  const { userToken } = useContext(AuthContext);

  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Landing);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLogged = !(userToken == null || userToken.token.length < 1)

  return (
    <>
      <Suspense fallback={<div />}>
        <BrowserRouter>
          <div className={`${isLogged ? 'flex h-full' : ''}`}>
            <Menu
              isLogged={isLogged}
              isTopOfPage={isTopOfPage}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />

            <div className={`${isLogged ? 'flex-1' : ''}`}>
              <Routes>
                <Route element={<ProtectedRoute isLogged={isLogged} redirectPath="/profile" />}>
                  <Route index path="/" element={
                    <Landing selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                  }/>
                </Route>

                <Route element={<ProtectedRoute isLogged={!isLogged} redirectPath="/" />}>
                  <Route path="/profile" element={<Profile  setSelectedPage={setSelectedPage} />} />
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

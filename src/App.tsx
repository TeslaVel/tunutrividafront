import { useState } from "react";
import { AuthProvider } from '@/AuthProviderManager';
import AppRoutes from "@/AppRoutes";
import { SelectedPage } from "@/shared/types";

interface IProps {
  updateMainStatusLogin: () => void
}

function App({updateMainStatusLogin}: IProps) {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Landing
  );

  return (
    <div className="app bg-gray-20">
      <AuthProvider updateMainStatusLogin={updateMainStatusLogin}>
        <AppRoutes selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      </AuthProvider>
    </div>
  );
}

export default App;

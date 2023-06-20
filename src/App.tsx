import { useState } from "react";
import { AuthProvider } from '@/AuthProviderManager';
import AppRoutes from "@/AppRoutes";
import { SelectedPage } from "@/types";

interface IProps {
  updateMainStatusLogin: () => void
  asignCLientForUploadImage: () => void
}

function App({updateMainStatusLogin, asignCLientForUploadImage}: IProps) {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Landing
  );

  return (
    <div className="app bg-gray-20">
      <AuthProvider updateMainStatusLogin={updateMainStatusLogin}>
        <AppRoutes
          asignCLientForUploadImage={asignCLientForUploadImage}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage} />
      </AuthProvider>
    </div>
  );
}

export default App;

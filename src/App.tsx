import { useState } from "react";
import { AuthProvider } from '@/AuthProviderManager';
import AppRoutes from "@/AppRoutes";
import { SelectedPage } from "@/shared/types";

type IProps = {
  setMainToken: (value: string) => void;
  removeMainToken: () => void;
};

function App(props: IProps) {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Landing
  );

  return (
    <div className="app bg-gray-20">
      <AuthProvider setMainToken={props.setMainToken} removeMainToken={props.removeMainToken}>
        <AppRoutes selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      </AuthProvider>
    </div>
  );
}

export default App;

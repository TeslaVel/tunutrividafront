import { useState } from "react";
import { AuthProvider } from '@/AuthProviderManager';
import AppRoutes from "@/AppRoutes";
import { SelectedPage } from "@/shared/types";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Landing
  );

  return (
    <div className="app bg-gray-20">
      <AuthProvider>
        <AppRoutes selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      </AuthProvider>
    </div>
  );
}

export default App;

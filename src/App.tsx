import { useState } from "react";
import { AuthProvider } from '@/AuthProviderManager';
import AppRoutes from "@/AppRoutes";

interface IProps {
  updateMainStatusLogin: () => void
  asignCLientForUploadImage: () => void
}

function App({updateMainStatusLogin, asignCLientForUploadImage}: IProps) {
  return (
    <div className="app">
      <AuthProvider updateMainStatusLogin={updateMainStatusLogin}>
        <AppRoutes
          asignCLientForUploadImage={asignCLientForUploadImage} />
      </AuthProvider>
    </div>
  );
}

export default App;

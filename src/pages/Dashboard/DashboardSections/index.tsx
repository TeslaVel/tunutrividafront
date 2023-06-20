import Entries from '@/pages/Dashboard/DashboardSections/Entries'
import UserHome from './Home/UserHome'

// types
import { UserType } from "@/types";

type Props = {
  userStored: UserType | null;
  optionSelected: string;
  handleCableAction: () => void;
  asignCLientForUploadImage: () => void;
};

const DashboardSections = ({optionSelected, handleCableAction, userStored, asignCLientForUploadImage}: Props) => {
  console.log('optionSelected', optionSelected)

  if (optionSelected === 'entries') {
    return (
      <Entries asignCLientForUploadImage={asignCLientForUploadImage}/>
    )
  }

  if (optionSelected === 'goals') {
    return (
      <div>
        Esta es la seccion del Goals
      </div>
    )
  }

  if (optionSelected === 'dashboard') {
    return (
      <UserHome
        userStored={userStored}
        handleCableAction={handleCableAction}
      />
    )
  }

  return (
    null
  )
};

export default DashboardSections;

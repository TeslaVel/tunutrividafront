import Entries from '@/pages/Dashboard/DashboardSections/Entries'
import UserHome from './Home/UserHome'

// types
import { UserType, UserColors } from "@/types";

type Props = {
  userStored: UserType | null
  userColors: UserColors | null
  optionSelected: string
  handleCableAction: () => void
  asignCLientForUploadImage: () => void
};

const DashboardSections = ({optionSelected, handleCableAction, userStored, userColors, asignCLientForUploadImage}: Props) => {
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
        userColors={userColors}
        handleCableAction={handleCableAction}
      />
    )
  }

  return (
    null
  )
};

export default DashboardSections;

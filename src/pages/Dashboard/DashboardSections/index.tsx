import Entries from '@/pages/Dashboard/DashboardSections/Entries'
import UserHome from './Home/UserHome'
import Palette from '@/components/Palette'

// types
import { UserType, UserColors } from "@/types";

type Props = {
  userStored: UserType | null
  userColors: UserColors
  optionSelected: string
  asignCLientForUploadImage: () => void
};

const DashboardSections = ({optionSelected, userStored, userColors, asignCLientForUploadImage}: Props) => {
  console.log('optionSelected', optionSelected)

  if (optionSelected === 'entries') {
    return (
      <Entries asignCLientForUploadImage={asignCLientForUploadImage}/>
    )
  }

  if (optionSelected === 'goals') {
    return (
      <div>
        <Palette />
      </div>
    )
  }

  if (optionSelected === 'dashboard') {
    return (
      <UserHome
        userStored={userStored}
        userColors={userColors}
      />
    )
  }

  return (
    null
  )
};

export default DashboardSections;

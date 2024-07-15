import Entries from '@/pages/Dashboard/DashboardSections/Entries'
import UserHome from './Home/UserHome'
import Palette from '@/components/Palette'

// types
import { FullUserType, ThemeType } from "@/types";

type Props = {
  userStored: FullUserType | null
  theme: ThemeType
  optionSelected: string
  asignCLientForUploadImage: () => void
};

const DashboardSections = ({optionSelected, userStored, theme, asignCLientForUploadImage}: Props) => {
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
        theme={theme}
      />
    )
  }

  return (
    null
  )
};

export default DashboardSections;

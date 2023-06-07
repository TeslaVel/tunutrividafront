import UserIcon from '@/assets/icons/userIcon'
import PhoneIcon from '@/assets/icons/phoneIcon'
import CameraIcon from '@/assets/icons/cameraIcon'
import ChevronUp from '@/assets/icons/chevronUp'
import ChevronDown from '@/assets/icons/chevronDown'
import { Colors } from '@/shared/types'

interface IProps {
  name: string,
  width?: number
  height?: number
  color?: Colors
}

const IconHandler = ({ name, width, height, color} : IProps) => {
  switch(name) {
    case 'in_person':
      return <UserIcon width={width} height={height} color={color}/>
    case 'phone_call':
      return <PhoneIcon width={width} height={height} color={color}/>
    case 'video_call':
      return <CameraIcon width={width} height={height} color={color}/>
    case 'chevron_down':
      return <ChevronDown width={width} height={height} color={color}/>
    case 'chevron_up':
      return <ChevronUp width={width} height={height} color={color}/>
    default:
      return null;
  }
};

export default IconHandler;
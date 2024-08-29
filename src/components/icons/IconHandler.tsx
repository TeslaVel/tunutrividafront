import UserIcon from '@/components/icons/userIcon'
import PhoneIcon from '@/components/icons/phoneIcon'
import CameraIcon from '@/components/icons/cameraIcon'
import ChevronUp from '@/components/icons/chevronUp'
import ChevronDown from '@/components/icons/chevronDown'
import { Colors } from '@/types'

type Props = {
  name: string,
  width?: number
  height?: number
  color?: Colors
}

const IconHandler: React.FC<Props> = ({ name, width, height, color} : Props) => {
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
import UserIcon from '@/assets/icons/userIcon'
import PhoneIcon from '@/assets/icons/phoneIcon'
import CameraIcon from '@/assets/icons/cameraIcon'
import { Colors } from '@/shared/types'

interface IProps {
  name: string,
  width?: number
  height?: number
  color?: Colors
}

const IconHandler = ({ name, width, height, color} : IProps) => {
  if (name === 'in_person') return <UserIcon width={width} height={height} color={color}/>
  if (name === 'phone_call') return <PhoneIcon  width={width} height={height} color={color}/>
  if (name === 'video_call') return <CameraIcon  width={width} height={height} color={color}/>

  return null
};

export default IconHandler;
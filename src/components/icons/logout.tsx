import { Colors } from '@/types'

type Props = {
  width?: number
  height?: number
  color?: Colors
}

const Logout: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = Colors.NONE
}: Props): JSX.Element =>
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
  </svg>

export default Logout
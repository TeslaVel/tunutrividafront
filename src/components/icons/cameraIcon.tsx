import { Colors } from '@/types'

type Props = {
  width?: number
  height?: number
  color?: Colors
}

const CameraIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = Colors.NONE
}: Props): JSX.Element =>
  <svg  width={width} height={height} xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
  </svg>

export default CameraIcon
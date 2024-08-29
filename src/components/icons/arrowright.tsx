import { Colors } from '@/types'

type Props = {
  width?: number
  height?: number
  color?: Colors
}

const ArrowRight: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = Colors.NONE
}: Props): JSX.Element =>
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>

export default ArrowRight
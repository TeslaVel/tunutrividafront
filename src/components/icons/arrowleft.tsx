import { Colors } from '@/types'

type Props = {
  width?: number
  height?: number
  color?: Colors
}

const ArrowLeft: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = Colors.NONE
}: Props): JSX.Element =>
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>

export default ArrowLeft
import { Colors } from '@/types'

interface IProps {
  width?: number
  height?: number
  color?: Colors
}

const ChevronUp = ({
  width = 24,
  height = 24,
  color = Colors.NONE
}: IProps ): JSX.Element =>
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>


export default ChevronUp
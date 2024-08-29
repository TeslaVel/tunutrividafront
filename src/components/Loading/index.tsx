import LoadingIcon from '@/components/icons/loadingIcon'

type Props = {
  width?: number
  height?: number
  color?: string
  fillColor?: string
}

export const Loading: React.FC<Props> = ({ width, height, color, fillColor} : Props) => {
  return (
    <div className="flex items-center justify-center w-full h-56 ">
      <div role="status">
          <LoadingIcon
            width={width}
            height={height}
            color={color}
            fillColor={fillColor}
          />
      </div>
    </div>
  )
};

export default Loading;
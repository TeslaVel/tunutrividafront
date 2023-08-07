import LoadingIcon from '@/components/icons/loadingIcon'

interface IProps {
  width?: number
  height?: number
  color?: string
  fillColor?: string
}

export const Loading = ({ width, height, color, fillColor} : IProps) => {
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
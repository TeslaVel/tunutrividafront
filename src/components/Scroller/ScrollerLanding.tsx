type Props = {
  children: JSX.Element
  height?: string | null
  scrollerName?: string
  marginTop?: string | null
  classNames?: string
  landing?: boolean
}

const Scroller: React.FC<Props> = ({
  children,
  scrollerName = 'component',
  marginTop = null,
  classNames = '',
  height = null
}: Props) => {
  const headerHeight = height ?? '0'
  const ztyle = {
    height: `calc(100vh - ${headerHeight}px)`,
    marginTop: `${marginTop}px`
  }

  return (
    <>
      <div
        className={`w-full flex flex-col items-center overflow-hidden scroller-content-${scrollerName} ${classNames}`}
        style={ztyle}>
        <div
          className={`flex w-full scroller-section-${scrollerName} flex overflow-y-scroll`}
          id={`scroller-section-${scrollerName}`}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default Scroller;
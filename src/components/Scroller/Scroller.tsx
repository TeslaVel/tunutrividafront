type Props = {
  children: JSX.Element
  header?: JSX.Element | null
  scrollerName?: string
  scrollerHeight?: string | null
  classNames?: string
}

const Scroller: React.FC<Props> = ({
  children,
  header = null,
  scrollerName = 'component',
  scrollerHeight = null,
  classNames = ''
}: Props) => {
  const headerHeight = scrollerHeight ?? '40'
  const withHeader = header !== null
  const ztyle = withHeader
    ? {
      height: `calc(100vh - ${headerHeight}px)`,
      marginTop: `${headerHeight}px`
    }
    : {
      height: '100vh'
    }

  return (
    <>
      { header &&
        <div className="topbar topbar gap-5 flex mx-5 fixed" style={{height: `${headerHeight}px`}}>
          {header}
        </div>
      }
      <div
        className={`w-full flex flex-col items-center overflow-hidden scroller-content-${scrollerName} ${classNames}`}
        style={ztyle}>
        <div
          className={`flex w-full scroller-section-${scrollerName} flex overflow-y-scroll`}
          id={`scroller-section-${scrollerName}`}
          style={{height: '100%'}}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default Scroller;
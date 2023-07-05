type Props = {
  children: JSX.Element
  header?: JSX.Element | null
  scrollerName?: string
  scrollerHeight?: string
  classNames?: string
}

const Scroller = ({
  children,
  header = null,
  scrollerName = 'component',
  classNames = '',
}: Props) => {
  const headerHeight = '40'
  const withTopNav = header !== null
  const ztyle = withTopNav
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
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default Scroller;
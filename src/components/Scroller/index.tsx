type Props = {
  children: JSX.Element
  header?: JSX.Element | null
  scrollerName?: string
  scrollerHeight?: string
  classNames?: string
}

const headerHeight = '40'

const Scroller = ({
  children,
  header = null,
  scrollerName = 'component',
  classNames = '',
}: Props) => {
  const withTopNav = header !== null

  return (
    <>
      { header &&
        <div className="topbar topbar gap-5 flex mx-5 fixed"  style={{height: `${headerHeight}px`}}>
          {header}
        </div>
      }
      <div
        className={`${withTopNav ? `mt-[${headerHeight}px]` : ''} w-full flex flex-col items-center overflow-hidden scroller-content-${scrollerName} ${classNames}`}
        style={{height: withTopNav ? `calc(100vh - ${headerHeight}px)` : '100vh'}}>
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
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
    ? { height: `calc(100vh - ${headerHeight}px)` }
    : { height: '100vh' }

  return (
    <>
      { header &&
        // Antes usaba `fixed`, que saca el topbar del flujo del flex layout
        // y no respeta el ancho variable de la sidebar (55px/250px) — con
        // `sticky` se queda en su posición normal (ya corregida por el
        // flex padre) y además se pega arriba al hacer scroll.
        <div
          className="topbar sticky top-0 z-20 flex w-full items-center gap-5 border-b border-gray-200 bg-white px-5 shadow-sm"
          style={{height: `${headerHeight}px`}}
        >
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
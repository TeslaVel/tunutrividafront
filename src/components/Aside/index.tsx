import { useState, useEffect } from 'react'
import useMediaQuery from "@/hooks/useMediaQuery";
import useDeviceType from "@/hooks/useDeviceType";
// types
import { ThemeType } from "@/types";

type Props = {
  children: JSX.Element
  theme: ThemeType
  title: string
  isOpen?: boolean
  close: () => void
}

const Aside: React.FC<Props> = ({children, isOpen, close, title, theme}: Props) => {
  const { isMobile } = useDeviceType();
  const [asideOpen, setAsideOpen] = useState<boolean>(false)

  useEffect(() => {
    if ( isOpen ) setAsideOpen(true)
    if ( !isOpen ) setAsideOpen(false)
  }, [isOpen]);

  if(!asideOpen) return null

  const closeAside = () => {
    close()
    setAsideOpen(false)
  }

  const injectedStyle = {
    background: theme?.sideBar.styleBgGradient
  }

  const width = isMobile ? 'w-[250px]' : 'w-[380px]'

  return (
    <aside className={`absolute min-h-screen top-0 right-0 ${width}`}>
      <div  className="p-3 min-h-screen text-white-01" style={injectedStyle}>
        <div className="flex items-center justify-between">
          <span className="">{title}</span>
          <span className="cursor-pointer" onClick={() => closeAside()}>X</span>
        </div>
        <hr style={{color: 'black', background: 'black', border: '1px solid #cbcaca'}} className="my-3" />
        <div>
          {children}
        </div>
      </div>
    </aside>
  )
}

export default Aside;
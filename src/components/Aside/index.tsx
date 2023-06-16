import { useState, useEffect } from 'react'

type Props = {
  children: JSX.Element
  title: string
  isOpen?: boolean
  close: () => void
}

const injectedStyle = {
  background: 'linear-gradient(50deg, #f8b4ff 0%, #ef91f7 100%)'
}

const Aside = ({children, isOpen, close, title}: Props) => {
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

  return (
    <div  className="absolute min-h-screen top-0 right-0 w-[250px]">
      <div  className="p-3 min-h-screen " style={injectedStyle}>
        <div className="flex items-center justify-between">
          <span className="">{title}</span>
          <span className="cursor-pointer" onClick={() => closeAside()}>X</span>
        </div>
        <hr style={{color: 'black', background: 'black', border: '1px solid #cbcaca'}} className="my-3" />
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Aside;
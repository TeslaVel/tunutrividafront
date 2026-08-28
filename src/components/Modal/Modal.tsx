import { useState, useEffect } from 'react'
import './globalModalStyle.css'
import LogoWordmark from '@/assets/ntv/logo_3.png'

type Props = {
  children: JSX.Element
  title: string
  isOpen?: boolean
  width?: string
  close: () => void
}

const Modal: React.FC<Props> = ({children, isOpen, width, close, title}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(isOpen ?? false)

  useEffect(() => {
    if ( isOpen ) setModalOpen(true)
    if ( !isOpen ) setModalOpen(false)
  }, [isOpen]);

  if(!modalOpen) return null

  const closeModal = () => {
    close()
    setModalOpen(false)
  }

  return (
    <div id="modal" className="fixed inset-0 flex items-center justify-center bg-landing-overlay p-4" style={{zIndex: '999'}}>
       <div className={`ntv-modal-custom-shadow rounded-2xl bg-white ${width ?? 'w-full sm:w-[26rem]'}`}>
          <div className="p-8">
            <div className="mb-5 flex items-center justify-between">
              <img src={LogoWordmark} alt="Tunutrivida" className="h-7 w-auto" />
              <button
                id="closeModalButton"
                className="text-landing-muted hover:text-landing-primary"
                aria-label="Cerrar"
                onClick={closeModal}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <h1 className="mb-5 text-xl font-bold leading-tight tracking-tight text-landing-ink">
              {title}
            </h1>
            {children}
          </div>
        </div>
    </div>
  )
}

export default Modal;

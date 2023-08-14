import { useState, useEffect, SyntheticEvent } from 'react'
import '@/components/Compound/Buttons/ActionButton.css'
import './globalModalStyle.css'

type Props = {
  children: JSX.Element
  title: string
  isOpen?: boolean
  maxWidth?: string
  width?: string
  close: () => void
  buttonTitle?: string
  action?: (e: React.SyntheticEvent) => Promise<void>
}

const ModalAction: React.FC<Props> = ({children, isOpen, action, width, maxWidth, close, title, buttonTitle = 'Ok'}: Props) => {
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

  const buttonStyles = `ntv-custom-button-shadow
  bg-primary-female-500 hover:bg-primary-female-700
  text-white-01 sm:px-7 text-center
  py-2  px-8 w-auto rounded-lg
  transition duration-500`


  const borderColor = 'border-primary-female-20'

  const handleCLick = (e: SyntheticEvent) => {
    if (action) {
      action(e)
    } else {
      console.log('no yet')
    }
  }

  const modalMAxWidth = maxWidth ? maxWidth : `max-w-[600px]`
  const modalWidth = width ? width :`md:max-w-md`

  return (
    <div id="modal" className="fixed inset-0 flex items-center justify-center ntv-modal-overlay" style={{zIndex: '999'}}>
      <div className={`ntv-modal-custom-shadow ${modalWidth} ${modalMAxWidth} rounded-lg overflow-hidden bg-primary-female-600 text-white-01`}>
        <div className={`modal-header grid justify-center py-4 px-6  border-b ${borderColor}`}>
          <h2 className="text-xl font-bold">{title}</h2>
          <button id="closeModalButton" className="absolute justify-self-end text-white-01 hover:text-pink-10" onClick={closeModal}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>

        { action &&
          <div className={`p-4 flex justify-center gap-10 border-t ${borderColor}`}>
            <button
              onClick={handleCLick}
              className={`${buttonStyles}`}
            >
              {buttonTitle}
            </button>

            <button
              onClick={closeModal}
              className={`${buttonStyles}`}
            >
              Cerrar
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default ModalAction;
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

const ModalDesign = ({children, isOpen, action, width, maxWidth, close, title, buttonTitle}: Props) => {
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

  // const buttonStyles = `ntv-custom-button-shadow
  // bg-dark-purple-500 hover:bg-dark-purple-700
  // text-white-01 sm:px-7 text-center
  // py-2  px-8 w-auto rounded-lg
  // transition duration-500`


  // const borderColor = 'border-dark-purple-20'

  const handleCLick = (e: SyntheticEvent) => {
    if (action) {
      action(e)
    } else {
      console.log('no yet')
    }
  }

  const modalMAxWidth = maxWidth ?  maxWidth : `max-w-[600px]`
  const modalWidth = width ? width :`md:max-w-md`

  return (
    <div id="modal" className="fixed inset-0 flex items-center justify-center ntv-modal-overlay" style={{zIndex: '999'}}>
       <div className="ntv-modal-custom-shadow rounded-lg dark:border md:mt-0  sm:w-[28rem] md: w-[35rem] lg:w-[35rem] xl:p-0 bg-dark-purple-700 border-dark-purple-700">
          <div className="p-8 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between mb-3">
              <div></div>
              <a href="#" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                Tunutrivida
              </a>
              <button id="closeModalButton" className=" text-white-01 hover:text-pink-10" onClick={closeModal}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className={`flex justify-between`}>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 {title}
              </h1>
            </div>
            {children}
          </div>
        </div>
    </div>
  )
}

export default ModalDesign;
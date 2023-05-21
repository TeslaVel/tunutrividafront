import { EntryType } from '@/shared/types'
import { useState } from 'react'

type Props = {
  children: JSX.Element
  isList: boolean
  setAction?: () => void
  setIsOpenAside?: (value: boolean) => void
}

const klasEntriesContent = 'entry-list-content w-full flex flex-col items-center overflow-hidden'
const KlassEntriesScroller = 'entry-list-scroller h-100 w-full flex flex-col items-center overflow-y-scroll'

const EntryWrapper = ({children, isList, setIsOpenAside, setAction}: Props) => {
  return (
    <div className={klasEntriesContent} style={{height: '80vh'}}>
      { isList &&
        <>
          <h1 className="text-2xl font-bold mb-4">Listado de Entrada</h1>
          <span style={{cursor: 'pointer'}} onClick={() => setIsOpenAside && setIsOpenAside(true)}>Nueva Entrada</span>
          <div></div>
        </>
      }
      <div className={KlassEntriesScroller} id="entry-list-scroller">
        { !isList &&
          <span style={{cursor: 'pointer'}} onClick={() => setAction && setAction()}>back</span>
        }
          {children}
      </div>
    </div>
  )
}

export default EntryWrapper;
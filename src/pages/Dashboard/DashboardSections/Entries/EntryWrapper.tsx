import { EntryType } from '@/shared/types'
import { useState } from 'react'

type Props = {
  children: JSX.Element
  isList: boolean
  setAction?: () => void
  setIsOpenAside?: (value: boolean) => void
}

const EntryWrapper = ({children, isList, setIsOpenAside, setAction}: Props) => {
  const KlassEntriesScroller = `entry-list-scroller mt-10 w-full flex ${ isList ? '' : 'justify-center' } flex-wrap gap-8`

  return (
    <div className="w-full">
      { isList &&
        <>
          <h1 className="text-2xl font-bold mb-4">Listado de Entrada</h1>
          <span style={{cursor: 'pointer'}} onClick={() => setIsOpenAside && setIsOpenAside(true)}>Nueva Entrada</span>
        </>
      }
      { !isList &&
        <span style={{cursor: 'pointer'}} onClick={() => setAction && setAction()}>back</span>
      }
      <div className={KlassEntriesScroller} id="entry-list-scroller">
          {children}
      </div>
    </div>
  )
}

export default EntryWrapper;
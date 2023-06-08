import { useEffect, useState, useContext, ChangeEvent } from 'react'
import { AuthContext } from '@/AuthProviderManager';
import { useGetUserEntries } from '@/hooks/useGetUserEntries'
import Scroller from '@/components/Scroller'
import { Entry } from './Entry'
import EntryWrapper from './EntryWrapper'
import { CreateEntryForm } from './CreateEntryForm'

// types
import { EntryType } from '@/shared/types'

type Props = {
  asignCLientForUploadImage: () => void;
};


export const Entries = ({asignCLientForUploadImage}: Props) => {
    const [orderBy] = useState<string>('created_at_desc')
    const { userStored } = useContext(AuthContext);
    const { loading: loadingEntries, data: dataEntries, refetch } = useGetUserEntries(orderBy)
    const [selectedEntry, setSelectedEntry] = useState<EntryType | null>(null)
    const [isOpenAside, setIsOpenAside] = useState<boolean>(false)

    useEffect(() => {
      refetch();
    }, []);

    if (!userStored) return null
    if (!userStored.token) return null
    if (loadingEntries) {
      return <div>Cargando...</div>;
    }
    if (!dataEntries?.entries) return null;
    const { entries } = dataEntries;
    const isList = selectedEntry == null

    const openAside = (value: boolean) => {
      console.log('abre aside', value)
      setIsOpenAside(value)

      if (value) {
        // const expirationDate = new Date();
        // expirationDate.setTime(expirationDate.getTime() + (60 * 60 * 1000)); // Agrega una hora en milisegundos
        window.localStorage.setItem('upldtkTnvD', JSON.stringify(true));
        // document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      } else {
        window.localStorage.removeItem('upldtkTnvD');
        // document.cookie = `upld=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    }

    const refetchEntries = () => {
      refetch()
    }

    return (
      <>
        <div className="w-full entry-wrapper-content">
          { !isList &&
              <>
                <span style={{cursor: 'pointer'}} onClick={() => setSelectedEntry(null)}>back</span>
                <EntryWrapper
                >
                  <Entry
                    key={`entry_key_${selectedEntry.id}`}
                    userStored={userStored}
                    entry={selectedEntry}
                    isList={isList}
                    showComments={true} />
                </EntryWrapper>
              </>

          }
          { isList &&
            <>
              <span style={{cursor: 'pointer'}} onClick={() => setIsOpenAside && setIsOpenAside(true)}>Nueva Entrada</span>
              <EntryWrapper>
              { entries?.map((entry: EntryType, index: number) => (
                  <Entry
                    key={`entry_key_${entry.id}`}
                    isList={isList}
                    setAction={setSelectedEntry}
                    userStored={userStored}
                    entry={entry}
                    showComments={false}
                  />
                  ))}
              </EntryWrapper>
            </>
          }
        </div>

        <CreateEntryForm
          refetch={refetchEntries}
          asignCLientForUploadImage={asignCLientForUploadImage}
          isOpenAside={isOpenAside}
          setIsOpenAside={setIsOpenAside}
        />
      </>
    )
};

export default Entries;

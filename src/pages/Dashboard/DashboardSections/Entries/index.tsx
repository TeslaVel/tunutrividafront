import { useEffect, useState, useContext, ChangeEvent } from 'react'
import { AuthContext } from '@/AuthProviderManager';
import { useGetUserEntries } from '@/hooks/useGetUserEntries'
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
        { !isList &&
          <EntryWrapper
            setAction={() => setSelectedEntry(null)}
            isList={isList}
          >
            <Entry
              key={`entry_key_${selectedEntry.id}`}
              userStored={userStored}
              entry={selectedEntry}
              isList={isList}
              showComments={true} />
          </EntryWrapper>

        }
        { isList &&
          <>
            <EntryWrapper
              isList={isList}
              setIsOpenAside={openAside}
            >
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

import { useEffect, useState, useContext, ChangeEvent } from 'react'
import { AuthContext } from '@/AuthProviderManager';
import { useGetUserEntries } from '@/hooks/useGetUserEntries'
// import Scroller from '@/components/Scroller/Scroller'
import { colorByGender } from '@/libs/utils/GeneralUtils'
import { Entry } from './Entry'
import EntryWrapper from './EntryWrapper'
import { CreateEntryForm } from './CreateEntryForm'
import { Loading } from '@/components/Loading'

// types
import { EntryType, ThemeType } from '@/types'

type Props = {
  asignCLientForUploadImage: () => void;
};

export const Entries: React.FC<Props> = ({asignCLientForUploadImage}: Props) => {
    const [orderBy] = useState<string>('created_at_desc')
    const { userStored } = useContext(AuthContext)
    const theme: ThemeType = colorByGender(userStored?.gender)
    const { loading: loadingEntries, data: dataEntries, refetch } = useGetUserEntries(orderBy)
    const [selectedEntry, setSelectedEntry] = useState<EntryType | null>(null)
    const [isOpenAside, setIsOpenAside] = useState<boolean>(false)

    useEffect(() => {
      refetch();
    }, []);

    if (!userStored) return null
    if (!userStored.token) return null
    // if (!dataEntries?.entries) return null;
    const entries: EntryType[] = dataEntries?.entries;
    const isList: boolean = selectedEntry == null

    // const openAside = (value: boolean) => {
    //   setIsOpenAside(value)

    //   if (value) {
    //     // const expirationDate = new Date();
    //     // expirationDate.setTime(expirationDate.getTime() + (60 * 60 * 1000)); // Agrega una hora en milisegundos
    //     window.localStorage.setItem('upldtkTnvD', JSON.stringify(true));
    //     // document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    //   } else {
    //     window.localStorage.removeItem('upldtkTnvD');
    //     // document.cookie = `upld=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    //   }
    // }

    const refetchEntries = () => {
      refetch()
    }

    return (
      <>
        <div className="w-full entry-wrapper-content">
          { loadingEntries &&
              <Loading
                width={45}
                height={45}
                fillColor={theme.general.fillSvgColorPrimary}/>
          }

          { !loadingEntries && selectedEntry &&
            <>
              <span style={{cursor: 'pointer'}} onClick={() => setSelectedEntry(null)}>back</span>
              <EntryWrapper
              >
                <Entry
                  key={`entry_key_${selectedEntry.id}`}
                  userStored={userStored}
                  theme={theme}
                  entry={selectedEntry}
                  isList={isList}
                  showComments={true} />
              </EntryWrapper>
            </>
          }

          { !loadingEntries && isList &&
            <>
              <div className="flex justify-center mx-auto mt-2">
                <button onClick={() => setIsOpenAside && setIsOpenAside(true)} className={`px-3 py-1 ${theme?.general.primaryBgColor} ${theme?.general.primaryBgColorHover} text-white rounded-lg`}>
                  New Entry
                </button>
              </div>

              { entries?.length < 1 &&
                <div className="p-[50px]">
                  There are no entries
                </div>
              }

              { entries?.length > 0 &&
                <EntryWrapper>
                  <>
                    { entries.map((entry: EntryType, index: number) => (
                      <Entry
                        key={`entry_key_${entry.id}`}
                        isList={isList}
                        setAction={setSelectedEntry}
                        userStored={userStored}
                        theme={theme}
                        entry={entry}
                        showComments={false}
                      />
                    ))}
                  </>
                </EntryWrapper>

              }
            </>
          }
        </div>

        <CreateEntryForm
          refetch={refetchEntries}
          asignCLientForUploadImage={asignCLientForUploadImage}
          isOpenAside={isOpenAside}
          setIsOpenAside={setIsOpenAside}
          theme={theme}
        />
      </>
    )
};

export default Entries;

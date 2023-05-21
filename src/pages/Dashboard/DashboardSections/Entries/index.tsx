import { useForm } from "react-hook-form";
import { useEffect, useState, useContext } from 'react'
import { useGetUserEntries } from '@/hooks/useGetUserEntries'
import { EntryType } from '@/shared/types'
import { Entry } from './Entry'
import EntryWrapper from './EntryWrapper'
import { AuthContext } from '@/AuthProviderManager';
import Aside from '@/components/Aside'
import { useMutationCreateEntry } from '@/hooks/graph/useMutationCreateEntry';

export const Entries = () => {
    const { userStored } = useContext(AuthContext);
    const { CreateEntry, data, loading, error, reset } = useMutationCreateEntry();
    const { loading: loadingEntries, data: dataEntries, refetch } = useGetUserEntries()
    const [selectedEntry, setSelectedEntry] = useState<EntryType | null>(null)
    const [isOpenAside, setIsOpenAside] = useState<boolean>(false)

    const {
      register,
      getValues,
      formState: { errors },
    } = useForm();

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
    }

    const createEntry = async (e: React.SyntheticEvent): Promise<void> => {
      e.preventDefault();
      const values = getValues()
      console.log('values', values)
      const { data } = await CreateEntry({ variables: values }) || {};
      if (error) {
        console.log(error)
      }
      else if (data && data.createEntry) {
        refetch()
        setIsOpenAside(false)
        const descriptionField = document.getElementById('description') as HTMLInputElement;
        descriptionField.value=''

        const myDiv = document.getElementById('entry-list-scroller')
        if (myDiv) {
          setTimeout(() => {
            myDiv.scrollTop = myDiv.scrollHeight;
          }, 2);
        }
      }
    };

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

        <Aside
          isOpen={isOpenAside}
          close={() => openAside(false)}
          title="Nueva Entrada"
        >
          <>
          <form
            target="_blank"
            onSubmit={createEntry}
            method="POST"
            id="form-create-entry"
          >
            <input type="hidden" id="entry_id"
              {...register("user_id")}
            />
            <div className="py-2">
              <label htmlFor="description">
                Descripcion
                <textarea  id="description" className="w-full"autoComplete='off'
                  {...register("description", {
                    required: true,
                    minLength: 1,
                  })}
                />
              </label>
            </div>
            <div className="py-2">
              <select id="entry_type" className="w-full px-2 py-1"
                {...register("entry_type", {
                  required: true,
                })}
              >
                <option value="FoodEntry">Comida</option>
                <option value="MetricEntry">Metricas</option>
                <option value="WorkoutEntry">Ejercicio </option>
                <option value="NoteEntry">Notas</option>
                <option value="OtherEntry">Otros</option>
              </select>
            </div>
            <div>
              <button type="submit" className="px-3 py-1 w-full bg-primary-400 hover:bg-primary-500 text-white rounded-lg">
                Crear
              </button>
            </div>
          </form>
          </>
        </Aside>
      </>
    )
};

export default Entries;

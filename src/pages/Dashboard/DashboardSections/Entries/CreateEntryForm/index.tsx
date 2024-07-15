import { ChangeEvent, useState } from 'react'
import { useForm } from "react-hook-form"
import Aside from '@/components/Aside'
import { CreateEntry } from '@/api/actions/createEntry'

// types
import { ThemeType } from "@/types";

type Props = {
  refetch: () => void
  theme: ThemeType
  asignCLientForUploadImage: () => void;
  isOpenAside: boolean;
  setIsOpenAside: (value: boolean) => void;
};

export const CreateEntryForm: React.FC<Props> = ({refetch, isOpenAside, setIsOpenAside, theme}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const watchImage: HTMLImageElement = watch('image');

  const createAction = async (e: React.SyntheticEvent): Promise<void> => {
    setLoading(true)
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', watch('image')); // Agrega el archivo de imagen al FormData
    formData.append('description', watch('description'));
    formData.append('entry_type', watch('entry_type'));

    try {
      const result = await CreateEntry(formData);
      refetch()
      setIsOpenAside(false)

      if (result) setLoading(false)
      const descriptionField = document.getElementById('description') as HTMLInputElement;
      descriptionField.value=''
      const myDiv = document.getElementById('entry-list-scroller')
      if (myDiv) {
        setTimeout(() => {
          myDiv.scrollTop = myDiv.scrollHeight;
        }, 2);
      }
    } catch (error) {
      console.log('error', error)
      setLoading(false)
      // Manejar el error
    }
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e?.target?.files) return
    const file = e.target.files[0];
    setValue('image', file, { shouldDirty: true })

    const reader = new FileReader();
    reader.onload = () => {
      const imagePreview = document.getElementById(
        'image-preview'
      ) as HTMLImageElement; // Anotación de tipo
      imagePreview.src = reader.result as string; // Anotación de tipo
    };
    reader.readAsDataURL(file);

    const values = getValues()
  };

  return(
    <Aside
      isOpen={isOpenAside}
      theme={theme}
      close={() => setIsOpenAside(false)}
      title="Nueva Entrada"
    >
      <>
        <form
          target="_blank"
          onSubmit={createAction}
          method="POST"
          id="form-create-entry"
          encType="multipart/form-data"
        >
          <div className="py-2">
            <label htmlFor="image">Imagen:</label>
            <input
              type="file"
              name='image'
              id="image"
              onChange={onImageChange}
            />
          </div>
          {watchImage && (
            <div className='flex justify-center py-2'>
              <img id='image-preview' className='w-48 h-90'/>
            </div>
          )}
          <div className="py-2">
            <label htmlFor="description">
              Descripcion
              <textarea
                id="description"
                className={`w-full p-1 ${theme?.general.baseTextColor}`}
                autoComplete='off'
                placeholder="Agregue una descripcion"
                {...register("description", {
                  required: true,
                  minLength: 1,
                })}
              />
            </label>
          </div>
          <div className="py-4">
            <label htmlFor="entry_type">
              Tipo de entrada
              <select
                id="entry_type"
                className="w-full px-2 py-1 text-black"
                placeholder="Seleccione un tipo"
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
            </label>
          </div>
          <div className="pt-4">
            <button type="submit"
              className={`px-3 py-1 w-full ${theme?.general.secondaryBgColor} ${theme?.general.secondaryBgColorHover} text-white rounded-lg`}
              disabled={loading}
            >
              Crear
            </button>
          </div>
        </form>
      </>
    </Aside>
  )
};

export default CreateEntryForm;
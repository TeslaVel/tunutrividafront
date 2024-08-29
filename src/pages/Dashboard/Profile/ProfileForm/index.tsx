import { ChangeEvent, useState, useContext } from 'react'
import { AuthContext } from '@/AuthProviderManager'
import { useForm } from "react-hook-form"
import Aside from '@/components/Aside'
import { UpdateProfile } from '@/api/actions/updateProfile'

// types
import { ThemeType } from "@/types";

type Props = {
  theme: ThemeType
  isOpenAside: boolean;
  setIsOpenAside: (value: boolean) => void;
};

const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const ProfileForm: React.FC<Props> = ({isOpenAside, setIsOpenAside, theme}: Props) => {
  const { userStored, storeUser } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const inputStyles = `w-full p-2 border rounded-md ${theme?.general.baseTextColor}`
  const watchImage: HTMLImageElement = watch('image');

  const updateProfile = async (e: React.SyntheticEvent): Promise<void> => {
    setLoading(true)
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', watch('image'));
    formData.append('first_name', watch('first_name'));
    formData.append('last_name', watch('last_name'));

    try {
      setIsOpenAside(false)
      const result = await UpdateProfile(formData);

      if (result.user) {
        setLoading(false)

        const newData = {
          ...userStored,
          ...result.user
        }

        storeUser(newData)
      }
    } catch (error) {
      console.log('error', error)
      setLoading(false)
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
      title="Update Profile"
    >
      <>
        <form
          target="_blank"
          onSubmit={updateProfile}
          method="POST"
          id="form-update-profile"
          encType="multipart/form-data"
        >
          <div className="py-2">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              name='image'
              id="image"
              onChange={onImageChange}
            />
          </div>
          { (watchImage || userStored?.imageUrl) && (
            <div className='flex justify-center py-2'>
              <img id='image-preview' className="w-[200px] h-[150px]" src={ userStored?.imageUrl ? userStored.imageUrl : ''} />
            </div>
          )}
          <div className="py-2">
            <label htmlFor="first_name">
              First Name
              <input
                id="first_name"
                className={inputStyles}
                autoComplete='off'
                placeholder="Add first name"
                defaultValue={userStored?.firstName}
                {...register("first_name", {
                  required: true,
                  minLength: 1,
                })}
              />
            </label>
          </div>

          <div className="py-2">
            <label htmlFor="last_name">
              Last Name
              <input
                id="last_name"
                className={inputStyles}
                autoComplete='off'
                placeholder="Add last name"
                defaultValue={userStored?.lastName}
                {...register("last_name", {
                  required: true,
                  minLength: 1,
                })}
              />
            </label>
          </div>

          <div className="py-2">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className={inputStyles}
              {...register("gender")}
            >
              {GENDERS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button type="submit"
              className={`px-3 py-1 w-full ${theme?.general.secondaryBgColor} ${theme?.general.secondaryBgColorHover} text-white rounded-lg`}
              disabled={loading}
            >
              Update
            </button>
          </div>
        </form>
      </>
    </Aside>
  )
};

export default ProfileForm;
import { useEffect, useState, useContext } from "react"
import NoImage from "@/assets/ntv/noimage.png";
import Scroller from '@/components/Scroller/Scroller'
import DashboardPageLayout from '@/components/DashboardPageLayout'
import { useGetUserProfile } from '@/hooks/useGetUserProfile'
import { Loading } from '@/components/Loading'
import { ProfileForm } from './ProfileForm'

// types
import { SelectedPage, ThemeType } from "@/types"

type Props = {
  theme: ThemeType
  setSelectedPage: (value: SelectedPage) => void;
};

const Profile: React.FC<Props> = ({setSelectedPage, theme }: Props) => {
  const { loading, data, refetch } = useGetUserProfile()
  const [isOpenAside, setIsOpenAside] = useState<boolean>(false)

  const labelStyles = 'text-xs font-semibold uppercase tracking-wide text-gray-400'
  const valueStyles = 'text-base text-gray-800'

  useEffect(() => {
    setSelectedPage(SelectedPage.Profile)
    refetch();
  }, []);


  const profile = data?.profile

  return (
    <Scroller scrollerName='profile'>
      <>
        <DashboardPageLayout id="profile" className="pt-5 md:pt-[5rem]">
          <>
          { loading &&
            <Loading
              width={45}
              height={45}
              fillColor={theme.general.fillSvgColorPrimary}
            />
          }
          { !loading &&
            <>
              <div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-sm sm:flex-row sm:items-start">
                <div className="flex flex-col items-center">
                  { profile?.imageUrl
                    ? <img src={profile?.imageUrl} alt="Foto de perfil" className="h-32 w-32 rounded-full object-cover" />
                    : <img src={NoImage} alt="Foto de perfil" className="h-32 w-32 rounded-full object-cover" />
                  }
                </div>
                <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <span className={labelStyles}>Nombre</span>
                    <span id="firstName" className={valueStyles}>{profile.firstName}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={labelStyles}>Apellido</span>
                    <span id="lastName" className={valueStyles}>{profile.lastName}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={labelStyles}>Edad</span>
                    <span id="age" className={valueStyles}>{profile.age}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={labelStyles}>Género</span>
                    <span id="gender" className={valueStyles}>{profile.gender}</span>
                  </div>
                </div>
              </div>
              <div className="flex mt-4">
                <button
                  className={`${theme.general.primaryBgColor} ${theme.general.primaryBgColorHover} text-white font-bold py-2 px-4 rounded`}
                  onClick={() => setIsOpenAside(!isOpenAside)}
                >
                  Editar
                </button>
              </div>
            </>
          }
          </>
        </DashboardPageLayout>

        <ProfileForm
          isOpenAside={isOpenAside}
          setIsOpenAside={setIsOpenAside}
          theme={theme}
        />
      </>
    </Scroller>
  );
}

export default Profile;

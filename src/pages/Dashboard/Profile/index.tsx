import { useEffect, useState, useContext } from "react"
import NoImage from "@/assets/ntv/noimage.png";
import Scroller from '@/components/Scroller/Scroller'
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

  const inputStyles = 'w-full py-2 px-3 border rounded-m'
  const labelStyles = 'font-medium mb-1'

  useEffect(() => {
    setSelectedPage(SelectedPage.Profile)
    refetch();
  }, []);


  const profile = data?.profile

  return (
    <Scroller scrollerName='profile'>
      <>
        <section id="chat" className="
          xxxs:pt-5 xxs:pt-5 lg:pt-[5rem] md:pt-[5rem] w-full
          xxxs:px-2 xxs:px-2 xs:px-4 sm:px-4 md:px-5 lg:px-5
          xxxs:w-full xxs:w-full xs:w-full sm:w-full md:w-5/6 lg:w-5/6 mx-auto
          ">
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
              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-center">
                  { profile?.imageUrl
                    ? <img src={profile?.imageUrl} alt="Logo" className="w-[350px] h-[250px]" />
                    : <img src={NoImage} alt="Logo" className="w-[350px] h-[250px]" />
                  }
                </div>
                <div className="flex flex-col">
                  <label htmlFor='firstName' className={labelStyles}>First Name:</label>
                  <span
                    id="firstName"
                    className={inputStyles}
                  >
                    {profile.firstName}
                  </span>
                </div>

                <div className="flex flex-col">
                  <label htmlFor='lastName' className={labelStyles}>Last Name:</label>
                  <span
                    id="lastName"
                    className={inputStyles}
                  >
                    {profile.lastName}
                  </span>
                </div>

                <div className="flex flex-col">
                  <label htmlFor='lastName' className={labelStyles}>Age</label>
                  <span
                    id="age"
                    className={inputStyles}
                  >
                    {profile.age}
                  </span>
                </div>

                <div className="flex flex-col">
                  <label htmlFor='gender' className={labelStyles}>Gender</label>
                  <span
                    id="gender"
                    className={inputStyles}
                  >
                    {profile.gender}
                  </span>
                </div>
              </div>
              <div className="flex mt-4">
                <button
                  className={`${theme.general.primaryBgColor} ${theme.general.primaryBgColorHover} text-white font-bold py-2 px-4 rounded`}
                  onClick={() => setIsOpenAside(!isOpenAside)}
                >
                  Edit
                </button>
              </div>
            </>
          }
          </>
        </section>

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

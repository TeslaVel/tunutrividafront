import { useEffect, useState, useContext } from "react"
import { AuthContext } from '@/AuthProviderManager'
import Scroller from '@/components/Scroller/Scroller'
import { Loading } from '@/components/Loading'
import { ProfileForm } from './ProfileForm'

// types
import { SelectedPage, ThemeType } from "@/types"

type Props = {
  theme: ThemeType
  setSelectedPage: (value: SelectedPage) => void;
};

const Profile: React.FC<Props> = ({setSelectedPage, theme }: Props) => {
  const [isOpenAside, setIsOpenAside] = useState<boolean>(false)
  const { userStored } = useContext(AuthContext);
  const loading = false

  if (!userStored) return null

  useEffect(() => {
    setSelectedPage(SelectedPage.Chat)
  }, []);
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
            <div className="flex flex-col">
            <label htmlFor='firstName' className="text-gray-700 font-medium mb-1">First Name:</label>
            <span
              id="firstName"
              className="input appearance-none w-full py-2 px-3 border rounded-md"
            >
              {userStored.firstName}
            </span>

            <label htmlFor='lastName' className="text-gray-700 font-medium mb-1">Last Name:</label>
            <span
              id="lastName"
              className="input appearance-none w-full py-2 px-3 border rounded-md"
            >
              {userStored.lastName}
            </span>

            <label htmlFor='lastName' className="text-gray-700 font-medium mb-1">Age</label>
            <span
              id="age"
              className="input appearance-none w-full py-2 px-3 border rounded-md"
            >
              {userStored.age}
            </span>

            <label htmlFor='gender' className="text-gray-700 font-medium mb-1">Gender</label>
            <select
              id="gender"
              className="input appearance-none w-full py-2 px-3 border rounded-md"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <div className="flex mt-4">
              <button
                className={`${theme.general.primaryBgColor} ${theme.general.primaryBgColorHover} text-white font-bold py-2 px-4 rounded`}
                onClick={() => setIsOpenAside(!isOpenAside)}
              >
                Edit
              </button>
            </div>
          </div>
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

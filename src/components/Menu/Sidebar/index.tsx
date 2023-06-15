import { useState, useEffect } from "react";
import NoImage from "@/assets/ntv/noimage.png";
import Calendar from "@/assets/icons/calendar"
import HomeIcon from "@/assets/icons/homeIcon"
import SessionIcon from "@/assets/icons/sessionIcon"
import ChatIcon from "@/assets/icons/chatIcon"
import Logout from "@/assets/icons/logout"
import ArrowRight from "@/assets/icons/arrowright"
import ArrowLeft from "@/assets/icons/arrowleft"
import { UserType } from '@/shared/types'
import { NavLink } from "react-router-dom";
import useMediaQuery from "@/hooks/useMediaQuery";

// types
import { SelectedPage } from "@/shared/types";

type Props = {
  selectedPage: SelectedPage;
  userStored: UserType | null;
  deleteUserStored: () => void;
}

const optionsForSidebar = [
  {label: 'Dashboard', value: 'dashboard', icon: 'home'},
  {label: 'Calendario', value: 'appointments', icon: 'calendar'},
  {label: 'Sessiones', value: 'sessions', icon: 'session'},
  {label: 'Chat', value: 'chat', icon: 'chat'}
];

const showIcon = (key: string) => {
  if (key === 'calendar') return <Calendar />
  if (key === 'home') return <HomeIcon />
  if (key === 'session') return <SessionIcon />
  if (key === 'chat') return <ChatIcon />

  return null
};

const Sidebar = ({selectedPage, userStored, deleteUserStored}: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 940px)");
  const [expanded, setExpanded] = useState<boolean>(true);
  const [elementVisible, setElementVisible] = useState<boolean>(true);

  useEffect(() => {
    if (isAboveMediumScreens) {
      setExpanded(true)
      setElementVisible(true)
    } else {
      setExpanded(false)
      setElementVisible(false)
    }
  }, [isAboveMediumScreens]);

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (expanded) setElementVisible(false)
  };

  const mostrarElementos = () => {
    if (expanded) setElementVisible(true)
  }

  const injectedStyle = {
    background: 'linear-gradient(50deg, #FF9C99 0%, #FFB0AD 100%)'
  }

  return (
    <div
      style={injectedStyle}
      className={`min-h-screen left-0 bottom-0 z-40 bg-primary-300 text-white flex flex-col transition-width duration-200 ease-in-out overflow-hidden ${
        expanded ? "w-[250px]" : "w-[55px] min-w-[55px]"
      }` }
      onTransitionEnd={() => mostrarElementos()}
    >
      <div className="overflow-scroll" style={{height: '100vh'}}>

        <div className="h-25 border-b border-gray-700 px-4 py-4">
          { expanded &&
            <>
              <div className="flex flex-col items-center pb-3">
                <img src={NoImage} alt="Logo" className="h-[6rem] w-[6rem]" />
                <h1 className="text-lg font-bold mt-2">{userStored?.firstName} {userStored?.lastName}</h1>
              </div>
              <div>
                <div className="flex flex-col items-center">
                  { userStored?.age &&
                    <span><strong>Edad </strong>{userStored?.age}</span>
                  }
                  { userStored?.height &&
                    <span><strong>Altura </strong>{userStored?.height} kg</span>
                  }
                  { userStored?.weight &&
                    <span><strong>Peso </strong>{userStored?.weight} kg</span>
                  }
                  { userStored?.imc &&
                    <span><strong>IMC </strong>{userStored?.imc} kg</span>
                  }
                </div>
              </div>
            </>
          }
        </div>
        <div className={`flex-1 flex flex-col justify-start ${ expanded ? 'px-4 py-3 ' : 'px-1 py-3 items-center'}`}>

          {optionsForSidebar.map((opt: { label: string; value: string, icon: string }, index: number) => (
            <NavLink
              key={`sidebar-option-${index}`}
              to={`/${opt.value}`}
              className={`h-8 mt-3 flex items-center rounded-lg hover:bg-primary-500 ${expanded ? 'px-4' : 'px-1'}
              ${selectedPage === opt.value ? 'bg-primary-500' : ''}`}
            >
              {showIcon(opt.icon)}
              {elementVisible && <span className="ml-2">{opt.label}</span>}
            </NavLink>
          ))}

          <span className={`h-8 mt-10 flex items-center rounded-lg hover:bg-primary-500 cursor-pointer ${expanded ? 'px-4' : 'px-1'}`}>
            <button className="flex" onClick={() => deleteUserStored()}>
              <Logout />
              { elementVisible && <span className="ml-2">Log Out</span> }
            </button>
          </span>

        </div>
        <div className="h-16 border-t border-gray-700 px-4 flex items-center justify-center">
          <button onClick={toggleExpand}>
            {expanded
              ? <ArrowLeft width={25} height={25} />
              : <ArrowRight width={25} height={25} />
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

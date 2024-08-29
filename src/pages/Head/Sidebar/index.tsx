import { useState, useEffect } from "react";
import NoImage from "@/assets/ntv/noimage.png";
import Calendar from "@/components/icons/calendar"
import HomeIcon from "@/components/icons/homeIcon"
import SessionIcon from "@/components/icons/sessionIcon"
import ChatIcon from "@/components/icons/chatIcon"
import Logout from "@/components/icons/logout"
import ArrowRight from "@/components/icons/arrowright"
import ArrowLeft from "@/components/icons/arrowleft"
import UserIcon from '@/components/icons/userIcon'
import { Colors } from '@/types'
import { NavLink, Link } from "react-router-dom";
import useMediaQuery from "@/hooks/useMediaQuery";

// types
import { SelectedPage, FullUserType, ThemeType } from "@/types";

type Props = {
  selectedPage: SelectedPage;
  theme: ThemeType
  userStored: FullUserType | null;
  deleteUserStored: () => void;
}

const optionsForSidebar = [
  {label: 'Dashboard', value: 'dashboard', icon: 'home'},
  {label: 'Calendario', value: 'appointments', icon: 'calendar'},
  {label: 'Sessiones', value: 'sessions', icon: 'session'},
  {label: 'Chat', value: 'chat', icon: 'chat'}
];

const showIcon = (value: string) => {
  switch(value) {
    case 'calendar':
      return <Calendar />
     case 'home':
      return <HomeIcon />
     case 'session':
      return <SessionIcon />
     case 'chat':
      return <ChatIcon />
    default:
      return null;
  }
};

const Sidebar: React.FC<Props> = ( {selectedPage, userStored, deleteUserStored, theme}: Props) => {
  const isAboveMediumScreens = useMediaQuery("(max-width: 600px)");
  const [expanded, setExpanded] = useState<boolean>(true);
  const [elementVisible, setElementVisible] = useState<boolean>(true);

  useEffect(() => {
    if (isAboveMediumScreens) {
      setExpanded(false)
      setElementVisible(false)
    } else {
      setExpanded(true)
      setElementVisible(true)
    }
  }, [isAboveMediumScreens]);


  if(theme === null) return null

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (expanded) setElementVisible(false)
  };

  const mostrarElementos = () => {
    if (expanded) setElementVisible(true)
  }

  const injectedStyle = {
    background: theme.sideBar.styleBgGradient
  }

  return (
    <div
      style={injectedStyle}
      className={`min-h-screen left-0 bottom-0 z-40 text-white flex flex-col transition-width duration-200 ease-in-out overflow-hidden ${
        expanded ? "min-w-[250px]" : "w-[55px] min-w-[55px]"
      }` }
      onTransitionEnd={() => mostrarElementos()}
    >
      <div style={{height: '100vh'}}>

        <div className="h-25 border-b border-gray-700 px-4 py-4">
          { expanded &&
            <>
              <div className="flex flex-col items-center pb-3">
                { userStored?.imageUrl
                  ? <img src={userStored?.imageUrl} alt="Logo" className="w-[200px] h-[150px]" />
                  : <img src={NoImage} alt="Logo" className="w-[200px] h-[150px]" />
                }
                <Link to='/profile'>
                  <h1 className="text-lg font-bold mt-2 flex items-center gap-2"><UserIcon width={15} height={15} color={Colors.WHITE01}/> {userStored?.firstName} {userStored?.lastName}</h1>
                </Link>
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
              className={`h-8 mt-3 flex items-center rounded-lg ${theme.sideBar.sidebarLinkHover} ${expanded ? 'px-4' : 'px-1'} ${selectedPage === opt.value ? `${theme.sideBar.sidebarLink}` : ''}`}
            >
              {showIcon(opt.icon)}
              {elementVisible && <span className="ml-2">{opt.label}</span>}
            </NavLink>
          ))}

          <span className={theme.sideBar.sidebarLinkHover + `h-8 mt-10 flex items-center rounded-lg cursor-pointer ${expanded ? 'px-4' : 'px-1'}`}>
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

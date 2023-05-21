import { useState } from "react";
import logo from "@/assets/ntv/logo_1.png";
import Calendar from "@/assets/icons/calendar"
import Logout from "@/assets/icons/logout"
import ArrowRight from "@/assets/icons/arrowright"
import ArrowLeft from "@/assets/icons/arrowleft"
import { NavLink } from "react-router-dom";
import { UserType } from '@/shared/types'
import { SelectedPage } from "@/shared/types";

type Props = {
  selectedPage: SelectedPage;
  userStored: UserType | null;
  deleteUserStored:  () => void;
}

const optionsForSidebar = [
  {label: 'Dashboard', value: 'dashboard'},
  {label: 'Appointments', value: 'appointments'},
  {label: 'Chat', value: 'chat'}
];

const Sidebar = ({selectedPage, userStored, deleteUserStored}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [elementVisible, setElementVisible] = useState<boolean>(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (expanded) setElementVisible(false)
  };

  const mostrarElementos = () => {
    if (expanded) setElementVisible(true)
  }

  const  injectedStyle = {
    background: 'linear-gradient(50deg, #FF9C99 0%, #FFB0AD 100%)'
  }

  return (
    <div
      style={injectedStyle}
      className={`min-h-screen left-0 bottom-0 z-40 bg-primary-300 text-white flex flex-col transition-width duration-200 ease-in-out ${
        expanded ? "w-[200px]" : "w-[55px] min-w-[55px]"
      }` }
      onTransitionEnd={() => mostrarElementos()}
    >
      <div className="h-25 border-b border-gray-700 px-4 py-4">
        { expanded &&
          <div className="flex flex-col items-center pb-3">
            <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-lg font-bold">{userStored?.firstName} {userStored?.lastName}</h1>
          </div>
        }
      </div>
      <div className={`flex-1 flex flex-col justify-start ${ expanded ? 'px-4 py-3 ' : 'px-1 py-3 items-center'}`}>

        {optionsForSidebar.map((opt: { label: string; value: string }, index: number) => (
          <NavLink
            key={`sidebar-option-${index}`}
            to={`/${opt.value}`}
            className={`h-8 mt-3 flex items-center rounded-lg hover:bg-primary-500 ${expanded ? 'px-4' : 'px-1'}
            ${selectedPage === opt.value ? 'bg-primary-500' : ''}`}
          >
            <Calendar />
            {elementVisible && <span className="ml-2">{opt.label}</span>}
          </NavLink>
        ))}

        <span className={`h-8 mt-3 flex items-center rounded-lg hover:bg-primary-500 cursor-pointer ${expanded ? 'px-4' : 'px-1'}`}>
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
  );
};

export default Sidebar;

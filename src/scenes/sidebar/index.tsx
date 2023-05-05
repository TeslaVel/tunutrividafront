import { useState, useContext } from "react";
import logo from "@/assets/ntv/logo_1.png";
import Calendar from "@/assets/icons/calendar"
import Logout from "@/assets/icons/logout"
import ArrowRight from "@/assets/icons/arrowright"
import ArrowLeft from "@/assets/icons/arrowleft"
import { NavLink } from "react-router-dom";
import { Colors } from '@/shared/types'
import { AuthContext } from '@/AuthProviderManager';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const { deleteToken } = useContext(AuthContext);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`fixed left-0 bottom-0 z-40 h-full bg-primary-300 text-white flex flex-col ${
        expanded ? "w-[200px]" : "w-[55px] min-w-[55px]"
      }`}
    >
      <div className="flex items-center h-20 border-b border-gray-700 px-4 py-4">
        <div>
          <button onClick={toggleExpand}
          >
            {expanded
              ? <ArrowLeft color={Colors.PRIMARY300}  />
              : <ArrowRight color={Colors.PRIMARY300}  />
            }
          </button>
        </div>
        { expanded &&
          <div className="flex flex-col items-center pl-3">
            <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-lg font-bold">Username</h1>
          </div>
        }
      </div>
      <div className={`flex-1 flex flex-col justify-start ${ expanded ? 'px-4 py-3 ' : 'px-1 py-3 items-center'}`}>
        <NavLink
          to="/dashboard"
          className={`h-8 mt-3 flex items-center rounded-lg hover:bg-gray-800 ${expanded ? 'px-4' : 'px-1'}`}
        >
          <Calendar />
          { expanded && <span>Dashboard</span> }
        </NavLink>

        <NavLink
          to="/calendar"
          className={`h-8 mt-3 flex items-center rounded-lg hover:bg-gray-800 ${expanded ? 'px-4' : 'px-1'}`}
        >
          <Calendar />
          { expanded && <span>Dashboard</span> }
        </NavLink>

      </div>
      <div className="h-16 border-t border-gray-700 px-4 flex items-center justify-center">
        <button onClick={() =>deleteToken()}>
          <Logout color={Colors.PRIMARY300} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

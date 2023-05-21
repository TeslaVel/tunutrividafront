import Entries  from '@/pages/Dashboard/DashboardSections/Entries'
import { useForm } from "react-hook-form";

type Props = {
  optionSelected: string;
  handleCableAction: () => void;
};

const DashboardSections = ({optionSelected, handleCableAction }: Props) => {
    if (optionSelected === 'Entries') {
      return (
        <Entries />
      )
    }

    if (optionSelected === 'Goals') {
      return (
        <div>
          Esta es la seccion del Goals
        </div>
      )
    }

    return (
      <div>
       Esta es la seccion del Dashboard
      <button className="btn btn-primary" onClick={handleCableAction}>Send message to backend</button>
    </div>
    )
};

export default DashboardSections;

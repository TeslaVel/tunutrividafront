import { useEffect, useState } from "react";
import { useGetAppointments } from '@/hooks/useGetAppointments'
import IconHandler from '@/assets/icons/IconHandler'
import { customDateFormat } from '@/components/utils/TimeUtils'
import { useLocation } from 'react-router-dom';
import { GeneralFilter } from '@/components/Filter'

// types
import { SelectedPage, AppointmentType } from '@/shared/types'

interface IProps {
  setSelectedPage: (value: SelectedPage) => void;
};

const optionFilter = [
  {label: 'Todos', value: ''},
  {label: 'Pendientes', value: 'pending'},
  {label: 'Ocurridos', value: 'ocurred'},
  {label: 'Cancelados', value: 'cancelled'},
]

export const Appointments = ({ setSelectedPage }: IProps) => {
  const [filterBy, setFilterBy] = useState<string>('pending')
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const statusParam = params.get('status');
  console.log('filterParam', statusParam)
  // const history = useHistory();
  const { loading, data, refetch } = useGetAppointments({status: filterBy})


  useEffect(() => {
    setSelectedPage(SelectedPage.Appointments)
    refetch();
  }, []);

  if (!data?.appointments) return null
  const { appointments } = data

  return (
    <>
      { loading &&
        <div>Cargando...</div>
      }
      <section id="appointments" className="py-3 px-3 md:h-full md:pb-0">
        <div className="md:h-5/6" >
          <div className="text-center my-5">
            <h2>Citas</h2>
          </div>
          <div className="flex p-2 ">
            <GeneralFilter options={optionFilter} filterSelected={filterBy} setFilterBy={setFilterBy} />
          </div>
          { appointments?.map((apt: AppointmentType, index: number) => (
            <div key={`appointment-${index}`} className="flex mt-2 px-3 py-2 bg-gray-20" style={{borderRadius: '20px'}}>
            <IconHandler name={apt.appointmentType}/> &nbsp; [{apt.status}] Fecha: {customDateFormat(apt.startDate, 'DD/MM/YY')}  {customDateFormat(apt.timeStart, 'HH:mm a')} - {customDateFormat(apt.timeEnd, 'HH:mm a')} 
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Appointments;

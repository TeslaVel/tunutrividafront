import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useGetAppointments } from '@/hooks/useGetAppointments'
import Scroller from '@/components/Scroller'
import CollapsibleSection from '@/components/CollapsibleSection'
import IconHandler from '@/components/icons/IconHandler'
import { customDateFormat } from '@/components/utils/TimeUtils'
import { GeneralFilter } from '@/components/Filter'

// types
import { SelectedPage, AppointmentType } from '@/types'

interface IProps {
  setSelectedPage: (value: SelectedPage) => void;
};

const optionFilter = [
  {label: 'Todos', value: ''},
  {label: 'Pendientes', value: 'pending'},
  {label: 'Finalizada', value: 'ocurred'},
  {label: 'Cancelados', value: 'cancelled'},
]

const stNames = {
  'pending': 'Pendiente',
  'ocurred': 'Finalizada',
  'happening': 'En Proceso',
  'cancelled': 'Cancelado',
}

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

  const statusName = (status_name: 'pending' | 'ocurred' | 'happening' | 'cancelled' = 'pending') => {
    if (!status_name) return ''

    return stNames[status_name]
  }

  return (
    <Scroller scrollerName='appointments'>
      <section id="appointments" className="py-3 px-5 w-full">
        { loading &&
          <div>Cargando...</div>
        }
        { !loading &&
          <div>
            <div className="text-center my-5">
              <h2>Citas</h2>
            </div>

            <GeneralFilter options={optionFilter} filterSelected={filterBy} setFilterBy={setFilterBy} />

            <div className=" pt-10">
              { appointments?.map((apt: AppointmentType, index: number) => (
                <CollapsibleSection
                  key={`appointment_${index}_${apt.id}`}
                  headerName={
                    <>
                      <IconHandler name={apt.appointmentType}/> &nbsp;[{statusName(apt.status)}] Fecha: {customDateFormat(apt.startDate, 'DD/MM/YY')}
                    </>
                  }>
                    <div>
                      <div><strong>Cita con:</strong> {apt.dietitian.fullName}</div>
                      <div><strong>Inicia:</strong> {customDateFormat(apt.timeStart, 'HH:mm a')} <strong>- </strong>{customDateFormat(apt.timeEnd, 'HH:mm a')}</div>
                    </div>
                </CollapsibleSection>
              ))}
            </div>
          </div>
        }
      </section>
    </Scroller>
  );
}

export default Appointments;

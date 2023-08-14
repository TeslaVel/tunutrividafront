import { useEffect, useState, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { AuthContext } from '@/AuthProviderManager';
import { useGetAppointments } from '@/hooks/useGetAppointments'
import Scroller from '@/components/Scroller/Scroller'
import CollapsibleSection from '@/components/CollapsibleSection'
import IconHandler from '@/components/icons/IconHandler'
import { customDateFormat } from '@/components/utils/TimeUtils'
import { GeneralFilter } from '@/components/Filter'
import { Loading } from '@/components/Loading'
import useMediaQuery from "@/hooks/useMediaQuery";

// types
import { SelectedPage, AppointmentType, UserColors} from '@/types'

interface Props {
  userColors: UserColors
  setSelectedPage: (value: SelectedPage) => void;
};

const optionFilter = [
  {label: 'Todos', value: ''},
  {label: 'Pendientes', value: 'pending'},
  {label: 'Finalizada', value: 'ocurred'},
  {label: 'Cancelados', value: 'cancelled'},
]

const statusName = {
  'pending': 'Pendiente',
  'ocurred': 'Finalizada',
  'happening': 'En Proceso',
  'cancelled': 'Cancelado',
}
export const Appointments: React.FC<Props> = ({
  setSelectedPage, userColors
}: Props) => {
  const { userStored } = useContext(AuthContext);
  const [filterBy, setFilterBy] = useState<string>('pending')
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const statusParam = params.get('status');
  const isAboveMediumScreens = useMediaQuery("(max-width: 450px)");
  // console.log('filterParam', statusParam)
  // const history = useHistory();
  const { loading, data, refetch } = useGetAppointments({status: filterBy})

  useEffect(() => {
    setSelectedPage(SelectedPage.Appointments)
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [filterBy]);

  // if (!data?.appointments) return null
  const appointments: AppointmentType[] = data?.appointments

  const getStatusName = (status_name: 'pending' | 'ocurred' | 'happening' | 'cancelled' = 'pending') => {
    if (!status_name) return ''

    return statusName[status_name]
  }

  return (
    <Scroller scrollerName='appointments'>
      <section id="appointments" className="py-3
        xxxs:px-1 xxs:px-1 xs:px-4 sm:px-4 md:px-5 lg:px-5
        xxxs:w-full xxs:w-full xs:w-full sm:w-full md:w-5/6 lg:w-5/6 mx-auto
        ">
        <div className="text-center my-5">
          <h2>Citas</h2>
        </div>

        <GeneralFilter
          options={optionFilter}
          filterSelected={filterBy}
          setFilterBy={setFilterBy}
          userColors={userColors}
          isMobile={isAboveMediumScreens}
        />

        <div className="pt-10">
          { loading &&
            <Loading
              width={45}
              height={45}
              fillColor={userColors.general.fillSvgColorPrimary}
            />
          }

          { !loading &&
            <>
              { appointments?.length < 1 &&
                <div>
                  No hay Citas
                </div>
              }

              { appointments?.length > 0 && appointments.map((apt: AppointmentType, index: number) => (
                <CollapsibleSection
                  key={`appointment_${index}_${apt.id}`}
                  userColors={userColors}
                  headerName={
                    <>
                      <IconHandler name={apt.appointmentType}/>&nbsp;[{getStatusName(apt.status)}] { !isAboveMediumScreens && <span>Fecha:</span>} {customDateFormat(apt.startDate, 'DD/MM/YY')}
                    </>
                  }>
                    <div>
                      <div><strong>Cita con:</strong> {apt.dietitian.fullName}</div>
                      <div><strong>Inicia:</strong> {customDateFormat(apt.timeStart, 'HH:mm a')} <strong>- </strong>{customDateFormat(apt.timeEnd, 'HH:mm a')}</div>
                    </div>
                </CollapsibleSection>
              ))}
            </>
          }
        </div>
      </section>
    </Scroller>
  );
}

export default Appointments;

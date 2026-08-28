import { useEffect, useState, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { useGetAppointments } from '@/hooks/useGetAppointments'
import Scroller from '@/components/Scroller/Scroller'
import DashboardPageLayout from '@/components/DashboardPageLayout'
import CollapsibleSection from '@/components/CollapsibleSection'
import IconHandler from '@/components/icons/IconHandler'
import { customDateFormat } from '@/libs/utils/TimeUtils'
import { GeneralFilter } from '@/components/Filter'
import { Loading } from '@/components/Loading'
import useMediaQuery from "@/hooks/useMediaQuery";
import { Pagination } from '@/components/Pagination'

// types
import { SelectedPage, AppointmentType, ThemeType} from '@/types'

interface Props {
  theme: ThemeType
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

// Antes el estado se mostraba como texto plano entre corchetes
// ([Pendiente]); ahora un badge con color real por estado.
const getStatusBadgeColor = (status: AppointmentType['status'] = 'pending') => {
  switch (status) {
    case 'cancelled':
      return 'bg-red-100 text-red-700'
    case 'ocurred':
      return 'bg-green-100 text-green-700'
    case 'happening':
      return 'bg-blue-100 text-blue-700'
    default:
      return 'bg-amber-100 text-amber-700'
  }
}
export const Appointments: React.FC<Props> = ({
  setSelectedPage, theme
}: Props) => {
  const [filterBy, setFilterBy] = useState<AppointmentType['status'] | string>('pending')
  const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const statusParam = params.get('status');
  const isSmallScreen = useMediaQuery("(max-width: 450px)");
  const [perPage] =  useState<number>(7)
  const [page, setPage] =  useState<number>(1)

  const { loading, appointments, pagination, refetch } = useGetAppointments({status: filterBy}, page, perPage)

  useEffect(() => {
    setSelectedPage(SelectedPage.Appointments)
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [filterBy]);

  useEffect(() => {
    refetch()
  }, [page]);

  const getStatusName = (status_name: AppointmentType['status'] = 'pending') => {
    if (!status_name) return ''

    switch (status_name) {
      case 'cancelled':
        return statusName['cancelled']
      case 'ocurred':
        return statusName['ocurred']
      case 'happening':
        return statusName['happening']
      default:
        return statusName['pending']
    }
  }

  const StatusBadge = ({ status }: { status: AppointmentType['status'] }) => (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusBadgeColor(status)}`}>
      {getStatusName(status)}
    </span>
  )

  return (
    <Scroller scrollerName='appointments'>
      <DashboardPageLayout id="appointments">
        <div className="text-center my-5">
          <h2>Citas</h2>
        </div>

        <GeneralFilter
          options={optionFilter}
          filterSelected={filterBy}
          setFilterBy={setFilterBy}
          theme={theme}
          isMobile={isSmallScreen}
        />

        <div className="pt-10">
          { loading &&
            <Loading
              width={45}
              height={45}
              fillColor={theme.general.fillSvgColorPrimary}
            />
          }

          { !loading &&
            <>
              { appointments?.length < 1 &&
                <div className="flex flex-col items-center gap-2 py-16 text-gray-400">
                  <IconHandler name="in_person" />
                  <p>No hay citas para mostrar.</p>
                </div>
              }

              { appointments?.length > 0 && appointments.map((apt: AppointmentType, index: number) => (
                <CollapsibleSection
                  key={`appointment_${index}_${apt.id}`}
                  theme={theme}
                  headerName={
                    <span className="flex items-center gap-2">
                      <IconHandler name={apt.appointmentType}/>
                      <StatusBadge status={apt.status} />
                      { !isSmallScreen && <span>Fecha:</span>} {customDateFormat(apt.startDate, 'DD/MM/YY')}
                    </span>
                  }>
                    <div>
                      <div><strong>Cita con:</strong> {apt.dietitian.fullName}</div>
                      <div><strong>Inicia:</strong> {customDateFormat(apt.timeStart, 'HH:mm a')} <strong>- </strong>{customDateFormat(apt.timeEnd, 'HH:mm a')}</div>
                    </div>
                </CollapsibleSection>
              ))}
              <Pagination
                totalPages={pagination?.totalPages}
                currentPage={pagination?.currentPage}
                prevPage={pagination?.prevPage}
                nextPage={pagination?.nextPage}
                theme={theme}
                setPage={setPage}
              />
            </>
          }
        </div>
      </DashboardPageLayout>
    </Scroller>
  );
}

export default Appointments;

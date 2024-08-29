import { useEffect, useState, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { useGetAppointments } from '@/hooks/useGetAppointments'
import Scroller from '@/components/Scroller/Scroller'
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
export const Appointments: React.FC<Props> = ({
  setSelectedPage, theme
}: Props) => {
  const [filterBy, setFilterBy] = useState<AppointmentType['status'] | string>('pending')
  const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const statusParam = params.get('status');
  const isAboveMediumScreens = useMediaQuery("(max-width: 450px)");
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
          theme={theme}
          isMobile={isAboveMediumScreens}
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
                <div>
                  No hay Citas
                </div>
              }

              { appointments?.length > 0 && appointments.map((apt: AppointmentType, index: number) => (
                <CollapsibleSection
                  key={`appointment_${index}_${apt.id}`}
                  theme={theme}
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
      </section>
    </Scroller>
  );
}

export default Appointments;

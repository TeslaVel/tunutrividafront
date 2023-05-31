import { useEffect } from "react";
import Entries  from '@/pages/Dashboard/DashboardSections/Entries'
import { useGetCurrentAppointments } from '@/hooks/useGetAppointments'
import IconHandler from '@/assets/icons/IconHandler'
import { customDateFormat } from '@/components/utils/TimeUtils'

// types
import { AppointmentType } from '@/shared/types'

type Props = {
  optionSelected: string;
  handleCableAction: () => void;
};

const DashboardSections = ({optionSelected, handleCableAction }: Props) => {
  const { loading, data, refetch } = useGetCurrentAppointments()

  useEffect(() => {
    refetch();
  }, []);

  if (optionSelected === 'entries') {
    return (
      <Entries />
    )
  }

  if (optionSelected === 'goals') {
    return (
      <div>
        Esta es la seccion del Goals
      </div>
    )
  }

  const currentAppointments = data?.currentAppointments;

  return (
    <div className='flex gap-10'>

      { loading &&
        <div>Cargando...</div>
      }
      { !loading &&

        <>
          <div className="w-[400px]  p-3">
             <h4 className="text-center"> Proximas Citas </h4>

              <div className="mt-3">
                <div className="py-2 ">
                  { currentAppointments?.map((apt: AppointmentType, index: number) => (
                    <div key={`dashboard-appointment-${index}`} className="flex mt-2 px-3 py-2 bg-gray-20" style={{borderRadius: '20px'}}>
                      <IconHandler name={apt.appointmentType}/> {customDateFormat(apt.timeStart, 'HH:mm a')} -{customDateFormat(apt.timeEnd, 'HH:mm a')}
                    </div>
                  ))}
                </div>
              </div>
          </div>

          <div className="w-[200px]  p-3">
              Otra cosa
          </div>
        </>
      }
      {/* <button className="btn btn-primary" onClick={handleCableAction}>Send message to backend</button> */}
    </div>
  )
};

export default DashboardSections;

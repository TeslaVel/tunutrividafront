import { useEffect } from "react";
import Entries from '@/pages/Dashboard/DashboardSections/Entries'
import { useGetCurrentAppointments } from '@/hooks/useGetAppointments'
import IconHandler from '@/components/IconHandler'
import BmiRanges from '@/components/BmiRanges'
import { customDateFormat } from '@/components/utils/TimeUtils'
import { UserType } from "@/shared/types";

// types
import { AppointmentType } from '@/shared/types'

type Props = {
  userStored: UserType | null;
  optionSelected: string;
  handleCableAction: () => void;
  asignCLientForUploadImage: () => void;
};

const DashboardSections = ({optionSelected, handleCableAction, userStored, asignCLientForUploadImage}: Props) => {
  const { loading, data, refetch } = useGetCurrentAppointments()

  useEffect(() => {
    refetch();
  }, []);

  if (optionSelected === 'entries') {
    return (
      <Entries asignCLientForUploadImage={asignCLientForUploadImage}/>
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
    <>

      { loading &&
        <div>Cargando...</div>
      }
      { !loading &&

        <div className='flex flex-col w-full'>
          <div className='bg-primary-20 p-3 flex flex-col' style={{alignSelf: 'center', borderRadius: '20px'}}>
            <strong className='text-center pb-5'>BMI</strong>
            <BmiRanges bmi={userStored?.imc} gender={userStored?.gender || null}/>
          </div>

          <div className='flex mt-10 gap-10'>
            <div className="w-[400px] p-3">
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

            <div className="w-[200px] p-3">
                Otra cosa
            </div>
          </div>
        </div>
      }
      {/* <button className="btn btn-primary" onClick={handleCableAction}>Send message to backend</button> */}
    </>
  )
};

export default DashboardSections;

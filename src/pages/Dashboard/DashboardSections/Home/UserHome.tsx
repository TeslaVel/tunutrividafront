import { useEffect } from "react";
import { useGetCurrentAppointments } from '@/hooks/useGetAppointments'
import { useGetSessionDataChart } from '@/hooks/useGetSessionDataChart'
import IconHandler from '@/components/IconHandler'
import BmiRanges from '@/components/BmiRanges'
import { customDateFormat } from '@/components/utils/TimeUtils'
import { UserType } from "@/shared/types";
import LineBar from "@/components/Chart/LineBar";

// types
import { AppointmentType } from '@/shared/types'

type Props = {
  userStored: UserType | null;
  handleCableAction: () => void;
};

const UserHome = ({userStored}: Props) => {
  const { loading, data, refetch } = useGetCurrentAppointments()
  const { loading: loadinChart, data: dataChart, refetch: refetchChart } = useGetSessionDataChart()

  useEffect(() => {
    refetch();
    refetchChart();
  }, []);

  const currentAppointments = data?.currentAppointments;
  const chartData = dataChart?.sessionDataChart;

  return (
    <>
      { loading &&
        <div>Cargando...</div>
      }
      { !loading &&
          <div className='dashboard-section flex flex-col w-full'>
            <div className='bg-primary-20 p-3 flex flex-col w-auto md:w-[50rem] sm:w-[30rem] xs:w-[25rem] xxs:w-[20rem] xxxs:w-100' style={{alignSelf: 'center', borderRadius: '20px'}}>
              <strong className='text-center pb-5'>BMI</strong>
              <BmiRanges bmi={userStored?.imc} gender={userStored?.gender || null}/>
            </div>

            { chartData &&
              <div className="flex justify-center  mt-[2rem]">
                <div  className="h-auto w-full md:w-[50rem] sm:w-[30rem] xs:w-[25rem] xxs:w-[20rem] xxxs:w-100 bg-gray-20">
                  <LineBar
                    loading={loadinChart}
                    chartTitle="Grafico de evolucion"
                    chartLabels={chartData.days}
                    optionRanges={[
                      {
                        name: 'Peso',
                        label: 'PESO',
                        color:'rgb(53, 162, 235)',
                        values: chartData?.weight
                      },
                      {
                        name: 'Imc',
                        label: 'IMC',
                        color:'rgb(255, 99, 132)',
                        values: chartData?.imc,
                      },
                      {
                        name: 'Grasa Corporal',
                        label: 'GC',
                        color:'rgb(209, 162, 88)',
                        values: chartData?.bodyGrease,
                      },
                      {
                        name: 'Masa Muscular',
                        label: 'MM',
                        color:'rgb(70, 245, 79)',
                        values: chartData?.muscleMass,
                      }
                    ]}
                  />
                </div>
              </div>
            }

            <div className='flex flex-col mt-10 gap-10'>
              <div className="w-full px-3 sm:px-3 xs:px-1 xxs:px-0 xxxs:px-0 ">
                <h4 className="text-center"> Proximas Citas </h4>
                  <div className="mt-3">
                    <div className="py-2">
                      { currentAppointments?.map((apt: AppointmentType, index: number) => (
                        <div key={`dashboard-appointment-${index}`} className="flex mt-2 px-3 py-2 bg-gray-20" style={{borderRadius: '20px'}}>
                          <IconHandler name={apt.appointmentType}/> {customDateFormat(apt.timeStart, 'HH:mm a')} -{customDateFormat(apt.timeEnd, 'HH:mm a')}
                        </div>
                      ))}
                    </div>
                  </div>
              </div>

              <div className="w-full p-3">
                  Otra cosa
              </div>
            </div>
          </div>
      }
    {/* <button className="btn btn-primary" onClick={handleCableAction}>Send message to backend</button> */}
    </>
  )
};

export default UserHome;

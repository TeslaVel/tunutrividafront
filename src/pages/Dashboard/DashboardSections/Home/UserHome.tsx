import { useEffect, useState } from "react";
import { useGetSessionDataChart } from '@/hooks/useGetSessionDataChart'
import { useGetCurrentAppointments } from '@/hooks/useGetAppointments'
import BmiRanges from '@/components/BmiRanges'
import { AppointmentType, FullUserType, ThemeType } from "@/types";
import LineBar from "@/components/Chart/LineBar";
import { Loading } from '@/components/Loading'
import { customDateFormat } from '@/libs/utils/TimeUtils'

// types

type Props = {
  userStored: FullUserType | null;
  theme: ThemeType
};

const UserHome = ({ userStored, theme}: Props) => {
  const [selectedChart, setSelectedChart] = useState<string>('bmi')

  const { loading: loadinChart, data: dataChart, refetch: refetchChart } = useGetSessionDataChart()
  // Antes /dashboard no tenía ningún resumen, solo el widget de BMI/gráfico
  // — se agrega un saludo y la próxima cita (si hay) reusando la query que
  // ya existe para current_appointments.
  const { data: appointmentsData } = useGetCurrentAppointments()
  const nextAppointment: AppointmentType | undefined = appointmentsData?.currentAppointments?.[0]

  useEffect(() => {
    refetchChart();
  }, []);

  const chartData = dataChart?.sessionDataChart;

  const selectOption = (option: string) => {
    setSelectedChart(option)
  }

  return (
    <>
      { loadinChart &&
        <Loading
          width={45}
          height={45}
          fillColor={theme.general.fillSvgColorPrimary}
        />
      }
      { !loadinChart &&
        <div className='dashboard-section flex flex-col w-full'>
          <div className="mx-auto mt-6 w-full max-w-3xl px-2">
            <h1 className={`text-xl font-bold ${theme?.general.baseTextColor}`}>
              ¡Hola{userStored?.firstName ? `, ${userStored.firstName}` : ''}! 👋
            </h1>
            {nextAppointment ? (
              <p className="mt-1 text-sm text-gray-500">
                Tu próxima cita es el <strong>{customDateFormat(nextAppointment.startDate, 'DD/MM/YY')}</strong> a las{' '}
                <strong>{customDateFormat(nextAppointment.timeStart, 'HH:mm a')}</strong>.
              </p>
            ) : (
              <p className="mt-1 text-sm text-gray-500">No tenés citas próximas agendadas.</p>
            )}
          </div>
          <div className='flex justify-center py-3'>
            <button key='btn-1' className={`px-3 mx-2 rounded ${theme?.chart.button}`} onClick={() => selectOption('bmi')}>BMI</button>
            <button key='btn-2' className={`px-3 mx-2 rounded ${theme?.chart.button}`} onClick={() => selectOption('charts')}>Charts</button>
          </div>

          { selectedChart === 'bmi' &&
            (
              <div className={`${theme?.bmi.primaryBgColor} mt-[8%]
                flex flex-col
                mx-auto lg:w-[40rem] md:w-[40rem] sm:w-[30rem] xs:w-[25rem] xxs:w-[20rem] xxxs:w-[17rem]
              `}>
                <strong className={`text-center pb-5 ${theme?.general.baseTextColor}`}>BMI</strong>
                <BmiRanges
                  bmi={userStored?.imc}
                  gender={userStored?.gender || null}
                  theme={theme}
                />
              </div>
            )
          }

          { selectedChart === 'charts' && chartData &&
            <div className={`${theme?.bmi.primaryBgColor}  mt-[8%]
              mx-auto lg:w-[40rem] md:w-[40rem] sm:w-[30rem] xs:w-[25rem] xxs:w-[20rem] xxxs:w-[17rem]`}>
              <LineBar
                chartTitle="Grafico de evolucion"
                chartLabels={chartData.days}
                theme={theme}
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
          }
        </div>
      }
    </>
  )
};

export default UserHome;

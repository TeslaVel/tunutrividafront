import { useEffect } from "react";
import { useGetSessionDataChart } from '@/hooks/useGetSessionDataChart'
import BmiRanges from '@/components/BmiRanges'
import { UserType, UserColors } from "@/types";
import LineBar from "@/components/Chart/LineBar";
import { Loading } from '@/components/Loading'

// types

type Props = {
  userStored: UserType | null;
  userColors: UserColors
};

const UserHome = ({ userStored, userColors}: Props) => {
  const { loading: loadinChart, data: dataChart, refetch: refetchChart } = useGetSessionDataChart()

  useEffect(() => {
    refetchChart();
  }, []);

  const chartData = dataChart?.sessionDataChart;

  return (
    <>
      { loadinChart &&
        <Loading
          width={45}
          height={45}
          fillColor={userColors.general.fillSvgColorPrimary}
        />
      }
      { !loadinChart &&
          <div className='dashboard-section flex flex-col w-full'>
            <div className={`${userColors?.bmi.primaryBgColor}
             flex flex-col
             mx-auto lg:w-[40rem] md:w-[40rem] sm:w-[30rem] xs:w-[25rem] xxs:w-[20rem] xxxs:w-[17rem]
            `}>
              <strong className={`text-center pb-5 ${userColors?.general.baseTextColor}`}>BMI</strong>
              <BmiRanges
                bmi={userStored?.imc}
                gender={userStored?.gender || null}
                userColors={userColors}
                />
            </div>

            { chartData &&
              <div className="flex mt-[2rem]">
                <div className={`${userColors?.bmi.primaryBgColor}
                  mx-auto lg:w-[40rem] md:w-[40rem] sm:w-[30rem] xs:w-[25rem] xxs:w-[20rem] xxxs:w-[17rem]`}>
                  <LineBar
                    chartTitle="Grafico de evolucion"
                    chartLabels={chartData.days}
                    userColors={userColors}
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
          </div>
      }
    </>
  )
};

export default UserHome;

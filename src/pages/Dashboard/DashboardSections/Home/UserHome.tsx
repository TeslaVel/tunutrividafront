import { useEffect } from "react";
import { useGetSessionDataChart } from '@/hooks/useGetSessionDataChart'
import BmiRanges from '@/components/BmiRanges'
import { UserType, UserColors } from "@/types";
import LineBar from "@/components/Chart/LineBar";

// types

type Props = {
  userStored: UserType | null;
  userColors: UserColors | null
  handleCableAction: () => void;
};

const UserHome = ({ userStored, userColors }: Props) => {
  const { loading: loadinChart, data: dataChart, refetch: refetchChart } = useGetSessionDataChart()

  useEffect(() => {
    refetchChart();
  }, []);

  const chartData = dataChart?.sessionDataChart;

  return (
    <>
      { loadinChart &&
        <div>Cargando...</div>
      }
      { !loadinChart &&
          <div className='dashboard-section flex flex-col w-full'>
            <div className={`${userColors?.bgGraphColor} p-3 flex flex-col md:w-[50rem] sm:w-[30rem] xs:w-[25rem] xxs:w-[20rem] xxxs:w-[18rem]`} style={{alignSelf: 'center', borderRadius: '20px'}}>
              <strong className='text-center pb-5'>BMI</strong>
              <BmiRanges
                bmi={userStored?.imc}
                gender={userStored?.gender || null}
                userColors={userColors}
                />
            </div>

            { chartData &&
              <div className="flex justify-center mt-[2rem]">
                <div className={`${userColors?.bgGraphColor} w-auto w-full md:w-[50rem] sm:w-[30rem] xs:w-[25rem] xxs:w-[20rem] xxxs:w-[18rem] p-3`}>
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
    {/* <button className="btn btn-primary" onClick={handleCableAction}>Send message to backend</button> */}
    </>
  )
};

export default UserHome;

import { useEffect, useState } from "react";
import { useGetSessionDataChart } from '@/hooks/useGetSessionDataChart'
import BmiRanges from '@/components/BmiRanges'
import { FullUserType, ThemeType } from "@/types";
import LineBar from "@/components/Chart/LineBar";
import { Loading } from '@/components/Loading'

// types

type Props = {
  userStored: FullUserType | null;
  theme: ThemeType
};

const UserHome = ({ userStored, theme}: Props) => {
  const [selectedChart, setSelectedChart] = useState<string>('bmi')

  const { loading: loadinChart, data: dataChart, refetch: refetchChart } = useGetSessionDataChart()

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

import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

type arrayObject = {
  name: string;
  color: string;
  label?: string;
  values: [string];
}

interface Props {
  loading: boolean,
  chartLabels: [string],
  chartTitle: string,
  optionRanges: arrayObject[]
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const optionsChart = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: false,
      text: ''
    },
  },
}

export const LineBar = ( { chartLabels, chartTitle, optionRanges }: Props ) => {
  if (!chartLabels) return null

  const [selectedValue, setSelectedValue] = useState<string>(optionRanges[0].name)
  const getDataSet = () => {
    let arrayData: arrayObject = optionRanges.filter((obj: any) => obj.name === selectedValue)[0];

    const dataSet = {
      label: selectedValue,
      data: arrayData?.values,
      borderColor: arrayData?.color,
    }
    return dataSet
  }

  const buttonSelections: string[] = optionRanges.map(({ name }) => name);

  const dataChart = {
    labels: chartLabels,
    datasets: [getDataSet()]
  }

  return (
    <div className="flex flex-col">
      {chartTitle && <h5 className='mx-2 mt-4 text-center'> {chartTitle} [{selectedValue}] </h5>}
      <Line options={optionsChart} data={dataChart} />
      <div className="mx-2 mt-4 flex gap-3 mb-3">
        { optionRanges?.map((opt: arrayObject, index: number) => (
          <button key={index} className="px-3 rounded bg-primary-50 hover:bg-primary-200" onClick={() => setSelectedValue(opt.name)}>{opt.label}</button>
        ))}
      </div>
    </div>
  )
}

export default LineBar

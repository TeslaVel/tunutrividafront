import { GeneralOptions } from '@/types'
import './style.css'
interface IProps {
  options: Array<GeneralOptions>
  filterSelected: string;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>
};

export const GeneralFilter = ({ options, filterSelected, setFilterBy }: IProps) => {
  if(!setFilterBy) return null
  if(!options) return null
  if(options.length < 1) return null

  return (
    <nav className='ntv-filter-tab inline-flex h-auto bg-pink-10 rounded-md border border-1 border-dark-purple-700'>
      { options.map((opt: any, index: number) => (
        <button
          className={`ntv-filter-tab-button
            border-r border-l border-dark-purple-700
            p-2 hover:text-white-01 hover:bg-dark-purple-500 hover:border-none
            ${opt.value === filterSelected ? 'text-white-01 bg-dark-purple-500' : ''}`}
          onClick={() => setFilterBy(opt.value)}
          key={index}
        >
          {opt.label}
        </button>
      ))}
    </nav>
  )
}

export default GeneralFilter;
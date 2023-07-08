import { GeneralOptions } from '@/types'

interface IProps {
  options: Array<GeneralOptions>
  filterSelected: string;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>
};

let filterTab = {
  borderRight: '1px solid #d1547d',
  padding: '1px 7px',
  borderTop: '1px solid #d1547d',
  borderBottom: '1px solid #d1547d',
  cursor: 'pointer'
}

export const GeneralFilter = ({ options, filterSelected, setFilterBy }: IProps) => {
  if(!setFilterBy) return null
  if(!options) return null
  if(options.length < 1)  return null

  return (
    <nav>
      { options.map((opt: any, index: number) => (
        <span
          className={`filter-tab hover:text-pink-300 ${opt.value === filterSelected ? 'text-pink-300' : ''}`}
          onClick={() => setFilterBy(opt.value)}
          style={
            index === 0
              ? { ...filterTab, borderLeft: '1px solid #d1547d', borderRadius: '20px 0 0 20px' }
              : index === options.length -1
                ? { ...filterTab, borderRadius: '0 20px 20px 0' }
                : filterTab}
          key={index}
        >
          {opt.label}
        </span>
      ))}
    </nav>
  )
}

export default GeneralFilter;
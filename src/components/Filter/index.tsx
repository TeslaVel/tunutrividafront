import { GeneralOptions, UserColors } from '@/types'
import './style.css'
interface IProps {
  options: Array<GeneralOptions>
  userColors: UserColors
  filterSelected: string;
  klass?: string;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>
  isMobile?: boolean
};

export const GeneralFilter = ({
  options,
  filterSelected,
  setFilterBy,
  userColors,
  isMobile=false
}: IProps) => {
  if(!setFilterBy) return null
  if(!options) return null
  if(options.length < 1) return null

  return (
    <>
      { isMobile &&
        <select onChange={(e) => setFilterBy(e.target.value)}
        className={`w-full px-3 py-1 cursor h-auto rounded-md ${userColors?.collapsible.primaryBgColor} ${userColors?.general.border} text-white-01`}>
          { options.map((opt: any, index: number) => (
            <option
              key={`filter-select-${opt.value}-${index}`}
              value={opt.value}
              selected={opt.value === filterSelected}
            >
              {opt.label}
            </option>
          ))}
        </select>
      }

      { !isMobile &&
        <nav className={`ntv-filter-tab inline-flex h-auto rounded-md ${userColors?.general.borderL} ${userColors?.filter.primaryBgColor}`}>
          { options.map((opt: any, index: number) => (
            <button
              key={index}
              className={`
                ntv-filter-tab-button
                ${userColors?.filter.borderR} ${userColors?.general.primaryBgColorHover} p-2 hover:text-white-01  hover:border-none
                ${opt.value === filterSelected ? `${userColors?.general.primaryBgColor} text-white-01` : `${userColors?.general.baseTextColor}`}`}
              onClick={() => setFilterBy(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </nav>
        }
    </>
  )
}

export default GeneralFilter;
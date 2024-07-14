import { GeneralOptions, ThemeType, AppointmentType } from '@/types'
import './style.css'
type Props = {
  options: Array<GeneralOptions>
  theme: ThemeType
  filterSelected: string;
  klass?: string;
  setFilterBy: React.Dispatch<React.SetStateAction<AppointmentType['status']>>
  isMobile?: boolean
};

export const GeneralFilter: React.FC<Props> = ({
  options,
  filterSelected,
  setFilterBy,
  theme,
  isMobile=false
}: Props) => {
  if(!setFilterBy) return null
  if(!options) return null
  if(options.length < 1) return null

  return (
    <div className='flex justify-center'>
      { isMobile &&
        <select onChange={(e) => setFilterBy(e.target.value)}
        className={`w-full px-3 py-1 cursor h-auto rounded-md ${theme?.collapsible.primaryBgColor} ${theme?.general.border} text-white-01`}>
          { options.map((opt: GeneralOptions, index: number) => (
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
        <nav className={`ntv-filter-tab inline-flex h-auto rounded-md ${theme?.general.borderL} ${theme?.filter.primaryBgColor}`}>
          { options.map((opt: GeneralOptions, index: number) => (
            <button
              key={index}
              className={`
                ntv-filter-tab-button
                ${theme?.filter.borderR} ${theme?.general.primaryBgColorHover} p-2 hover:text-white-01  hover:border-none
                ${opt.value === filterSelected ? `${theme?.general.primaryBgColor} text-white-01` : `${theme?.general.baseTextColor}`}`}
              onClick={() => setFilterBy(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </nav>
        }
    </div>
  )
}

export default GeneralFilter;
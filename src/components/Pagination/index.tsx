// types
import { ThemeType } from "@/types";

type Props = {
  theme: ThemeType
  totalPages: number
  currentPage: number
  prevPage: number | null
  nextPage: number | null
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const Pagination: React.FC<Props> = ({totalPages, currentPage = 1, prevPage, nextPage, theme, setPage} : Props) => {
  if (prevPage === null && nextPage === null ) return null
  const distance = 5
  const rangeStart = ((totalPages - currentPage) < (distance - 1))
    ? totalPages - (distance - 1)
    : prevPage || 1;
    // : currentPage % distance === 0
    //   ? Math.max(1, currentPage) // pendente
    //   : prevPage || 1;

  // const rangeEnd = Math.min(totalPages + 1, (rangeStart - 1) + distance);

  const pts = Array.from({ length: distance  }, (_, index) => rangeStart + index);
  // const pts = Array.from({ length: totalPages }, (_, index) => index + 1);

  const getClassRounded = (e: number) => {
    return prevPage === null && e === 1
            ? 'rounded-l-lg'
            : nextPage === null && e === totalPages
              ? 'rounded-r-lg'
              : ''
  }
  return (
    <nav aria-label="Page navigation" className="w-full flex justify-center">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        { prevPage !== null &&
          <>
            <li key={`pagination-item-total-${totalPages}`}>
              <span
                onClick={() => setPage(1)}
                className={`flex items-center cursor-pointer justify-center px-3 h-8 text-lg leading-tight ${theme.general.baseTextColor}`}>
                ({1})
              </span>
            </li>
            <li key={`pagination-item-prev-${prevPage}`}>
              <button
                disabled={ prevPage === currentPage || prevPage === null}
                onClick={() => setPage(prevPage)}
                className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight
                  text-white-01 rounded-l-lg hover:bg-gray-100
                  ${theme.general.primaryBgColor} ${theme.general.primaryBgColorHover}
                  disabled:bg-gray-20
                `}>
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
              </button>
            </li>
          </>
        }
        {pts.map((element: number, index: number) => (
          element > 0 && element <= totalPages &&
          <li key={`pagination-item-${element}`}>
            <button
              onClick={() => setPage(element)}
              className={`flex items-center justify-center px-3 h-8 leading-tight
              text-white-01 ${getClassRounded(element)}
              ${ element === currentPage ? theme.general.secondaryBgColor : theme.general.primaryBgColor }
              ${ element === currentPage ? '' : theme.general.primaryBgColorHover }`}>
                {element}
            </button>
          </li>
        ))}
        { nextPage !== null &&
          <li key={`pagination-item-next-${nextPage}`}>
            <button
              disabled={ nextPage === currentPage || nextPage === null}
              onClick={() => setPage(nextPage)}
              className={`flex items-center justify-center px-3 h-8 leading-tight
                text-white-01 rounded-r-lg
                ${theme.general.primaryBgColor} ${theme.general.primaryBgColorHover}
                disabled:bg-gray-20
              `}>
              <span className="sr-only">Next</span>
              <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
            </button>
          </li>
        }
        { totalPages !== currentPage &&
          <li key={`pagination-item-total-${totalPages}`}>
            <span
              onClick={() => setPage(totalPages)}
              className={`flex items-center cursor-pointer justify-center px-3 h-8 text-lg leading-tight ${theme.general.baseTextColor}`}>
              ({totalPages})
            </span>
          </li>
        }
      </ul>
    </nav>
  )
};

export default Pagination;
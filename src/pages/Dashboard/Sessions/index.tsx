import { useEffect, useState } from "react";
// import { AuthContext } from '@/AuthProviderManager';
import { useGetSessions } from '@/hooks/useGetSessions'
import Scroller from '@/components/Scroller/Scroller'
import CollapsibleSection from '@/components/CollapsibleSection'
import { customDateFormat } from '@/libs/utils/TimeUtils'
import { Loading } from '@/components/Loading'
import { Pagination } from '@/components/Pagination'
// types
import { SelectedPage, SessionType, PaginatedSessionType, ThemeType } from "@/types";

type Props = {
  theme: ThemeType
  setSelectedPage: (value: SelectedPage) => void;
};

export const Sessions: React.FC<Props> = ({setSelectedPage, theme}: Props) => {
  const [perPage] =  useState<number>(7)
  const [page, setPage] =  useState<number>(1)

  const { loading, sessions, pagination, refetch } = useGetSessions(page, perPage)

  useEffect(() => {
    setSelectedPage(SelectedPage.Sessions)
    refetch()
  }, []);

  useEffect(() => {
    refetch()
  }, [page]);

  return (
    <Scroller scrollerName='sessions'>
      <section id="sessions" className="
        xxxs:px-1 xxs:px-1 xs:px-4 sm:px-4 md:px-5 lg:px-5
        xxxs:w-full xxs:w-full xs:w-full sm:w-full md:w-5/6 lg:w-5/6 mx-auto
      ">
        <div className="text-center my-5">
          <h2>Sesiónes</h2>
        </div>

        { loading &&
            <Loading
              width={45}
              height={45}
              fillColor={theme.general.fillSvgColorPrimary}/>
        }

        { !loading &&
          <>
            { sessions?.length < 1 &&
              <div>
                No hay Sesiónes
              </div>
            }

            { sessions?.length > 0 &&
              <>
                { sessions.map((session, index) => (
                  <CollapsibleSection
                    key={`session_${index}_${session.id}`}
                    headerName={customDateFormat(session.date, 'DD/MM/YY')}
                    theme={theme}
                  >
                    <>
                      <div className="flex flex-row gap-10">
                        <div className="flex flex-col">
                          <span><strong>Edad</strong>: {session.age} </span>
                          <span><strong>Altura</strong>: {session.height} </span>
                          <span><strong>Peso</strong>: {session.weight} </span>
                          <span><strong>IMC</strong>: {session.imc} </span>
                        </div>
                        <div className="flex flex-col">
                          { session.hip && <span><strong>Cadera</strong>: {session.hip}</span>}
                          { session.waist && <span><strong>Cintura</strong>: {session.waist}</span>}
                          { session.highAbdomen && <span><strong>Abdomen Alto</strong>: {session.highAbdomen}</span>}
                          { session.lowAbdomen && <span><strong>Abdomen Bajo</strong>: {session.lowAbdomen}</span>}
                        </div>
                        <div className="flex flex-col">
                          { session.bodyGrease && <span><strong>Grasa Corporal</strong>: {session.bodyGrease}</span>}
                          { session.visceralGrease && <span><strong>Grasa Visceral</strong>: {session.visceralGrease}</span>}
                          { session.idealWeight && <span><strong>Peso Ideal Muscular</strong>: {session.idealWeight}</span>}
                          { session.muscleMass && <span><strong>Masa Muscular</strong>: {session.muscleMass}</span>}
                        </div>

                        <div className="flex flex-col">
                          { session.boneMass && <span><strong>Masa Osea</strong>: {session.boneMass}</span>}
                          { session.physicalComplexion && <span><strong>Complexion Fisica</strong>: {session.physicalComplexion}</span>}
                          { session.activityFactor && <span><strong>Factor Actvidad</strong>: {session.activityFactor.name}</span>}
                        </div>
                      </div>

                      { session?.diet?.dietMealWeeks &&
                        <div className="py-5" style={{ overflowX: 'auto' }}>
                          <div className="grid grid-cols-7 grid-rows-auto text-center">
                            {/* Header row for days of the week */}
                            {session.diet.dietMealWeeks.map((dmw, index) => (
                              <div
                                key={index}
                                className={`text-white ${theme.general.primaryBgColor} border font-bold`}
                              >
                                {dmw.dayOfWeek}
                              </div>
                            ))}
                            {/* Meal time and information for each day */}
                            {session.diet.dietMealWeeks.map((dmw, index) => (
                              <div key={index} className="grid grid-cols-1 mt-4">
                                {dmw.dietMealTimes.map((dmt, index) => (
                                  <div key={index} className="grid grid-cols-3 border p-2">
                                    {/* Meal time */}
                                    <div className="col-span-3 font-bold">{dmt.mealTime}</div>
                                    {/* Meal name */}
                                    <div className="col-span-3">{dmt.dietIngredient.meal.name}</div>
                                    {/* Instructions */}
                                    <div className="col-span-3 text-sm">{dmt.dietIngredient.instructions}</div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      }
                    </>
                  </CollapsibleSection>
                ))}

                <Pagination
                  totalPages={pagination?.totalPages}
                  currentPage={pagination?.currentPage}
                  prevPage={pagination?.prevPage}
                  nextPage={pagination?.nextPage}
                  theme={theme}
                  setPage={setPage}
                />
              </>
            }
          </>
        }
      </section>
    </Scroller>
  );
}

export default Sessions;

import { useEffect, useState } from "react";
// import { AuthContext } from '@/AuthProviderManager';
import { useGetSessions } from '@/hooks/useGetSessions'
import Scroller from '@/components/Scroller/Scroller'
import DashboardPageLayout from '@/components/DashboardPageLayout'
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
      <DashboardPageLayout id="sessions">
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
              <div className="flex flex-col items-center gap-2 py-16 text-gray-400">
                <p>No hay sesiones registradas todavía.</p>
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
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {[
                          { label: 'Edad', value: session.age },
                          { label: 'Altura', value: session.height },
                          { label: 'Peso', value: session.weight },
                          { label: 'IMC', value: session.imc },
                          { label: 'Cadera', value: session.hip },
                          { label: 'Cintura', value: session.waist },
                          { label: 'Abdomen Alto', value: session.highAbdomen },
                          { label: 'Abdomen Bajo', value: session.lowAbdomen },
                          { label: 'Grasa Corporal', value: session.bodyGrease },
                          { label: 'Grasa Visceral', value: session.visceralGrease },
                          { label: 'Peso Ideal Muscular', value: session.idealWeight },
                          { label: 'Masa Muscular', value: session.muscleMass },
                          { label: 'Masa Osea', value: session.boneMass },
                          { label: 'Complexión Física', value: session.physicalComplexion },
                          { label: 'Factor Actividad', value: session.activityFactor?.name },
                        ].filter((stat) => stat.value !== undefined && stat.value !== null && stat.value !== '').map((stat) => (
                          <div key={stat.label} className="rounded-lg bg-gray-50 p-3">
                            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">{stat.label}</div>
                            <div className="text-base text-gray-800">{stat.value}</div>
                          </div>
                        ))}
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
      </DashboardPageLayout>
    </Scroller>
  );
}

export default Sessions;

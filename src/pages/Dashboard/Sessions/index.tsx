import { useEffect, useContext } from "react";
import { AuthContext } from '@/AuthProviderManager';
import { useGetSessions } from '@/hooks/useGetSessions'
import Scroller from '@/components/Scroller/Scroller'
import CollapsibleSection from '@/components/CollapsibleSection'
import { customDateFormat } from '@/components/utils/TimeUtils'
// types
import { SelectedPage, SessionType, UserColors } from "@/types";

interface IProps {
  userColors: UserColors
  setSelectedPage: (value: SelectedPage) => void;
};

export const Sessions = ({setSelectedPage, userColors}: IProps) => {
  const { userStored } = useContext(AuthContext);
  const { loading, data, refetch } = useGetSessions()

  useEffect(() => {
    setSelectedPage(SelectedPage.Sessions)
    refetch()
  }, []);

  if (!data?.sessions) return null
  const { sessions } = data

  return (
    <Scroller scrollerName='sessions'>
      <section id="sessions" className="
        xxxs:px-1 xxs:px-1 xs:px-4 sm:px-4 md:px-5 lg:px-5
        xxxs:w-full xxs:w-full xs:w-full sm:w-full md:w-5/6 lg:w-5/6 m-auto
      ">
        { loading &&
          <div>Cargando...</div>
        }
        { !loading &&
          <div >
            <div className="text-center my-5">
              <h2>Sesiones</h2>
            </div>
            { sessions?.map((session: SessionType, index: number) => (
              <CollapsibleSection
                key={`session_${index}_${session.id}`}
                headerName={customDateFormat(session.date, 'DD/MM/YY')}
                userColors={userColors}
              >
                <div className="flex flex-col">
                  <div><strong>Edad</strong>: {session.age}</div>
                  <div><strong>Altura</strong>: {session.height}</div>
                  <div><strong>Peso</strong>: {session.weight}</div>
                  <div><strong>IMC</strong>: {session.imc}</div>
                  { session.hip && <div><strong>Cadera</strong>: {session.hip}</div>}
                  { session.waist && <div><strong>Cintura</strong>: {session.waist}</div>}
                  { session.highAbdomen && <div><strong>Abdomen Alto</strong>: {session.highAbdomen}</div>}
                  { session.lowAbdomen && <div><strong>Abdomen Bajo</strong>: {session.lowAbdomen}</div>}
                  { session.bodyGrease && <div><strong>Grasa Corporal</strong>: {session.bodyGrease}</div>}
                  { session.visceralGrease && <div><strong>Grasa Visceral</strong>: {session.visceralGrease}</div>}
                  { session.idealWeight && <div><strong>Peso Ideal Muscular</strong>: {session.idealWeight}</div>}
                  { session.muscleMass && <div><strong>Masa Muscular</strong>: {session.muscleMass}</div>}
                  { session.boneMass && <div><strong>Masa Osea</strong>: {session.boneMass}</div>}
                  { session.physicalComplexion && <div><strong>Complexion Fisica</strong>: {session.physicalComplexion}</div>}
                  { session.activityFactor && <div><strong>Factor Actvidad</strong>: {session.activityFactor.name}</div>}
                </div>
              </CollapsibleSection>
            ))}
          </div>
        }
      </section>
    </Scroller>
  );
}

export default Sessions;

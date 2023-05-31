import { useEffect, useState } from "react";
import { useGetSessions } from '@/hooks/useGetSessions'

// types
import { SelectedPage, SessionType } from "@/shared/types";

interface IProps {
  setSelectedPage: (value: SelectedPage) => void;
};

export const Sessions = ({setSelectedPage }: IProps) => {
  const { loading, data, refetch } = useGetSessions()

  useEffect(() => {
    setSelectedPage(SelectedPage.Sessions)
  }, []);

  if (!data?.sessions) return null
  const { sessions } = data

  return (
    <>
      { loading &&
        <div>Cargando...</div>
      }
      <section id="sessions" className="py-3 px-3 md:h-full md:pb-0">
        <div className="md:h-5/6" >
          <div className="text-center my-5">
            <h2>Sesiones</h2>
          </div>
          { sessions?.map((session: SessionType, index: number) => (
            <div key={`sessions-${index}`} className="flex mt-2 px-3 py-2 bg-gray-20" style={{borderRadius: '20px'}}>
              {session.date}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Sessions;

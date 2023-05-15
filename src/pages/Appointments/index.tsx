import { useEffect } from "react";
import { SelectedPage } from "@/shared/types";


type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};


export const Appointments = ({ selectedPage, setSelectedPage }: Props) => {

  useEffect(() => {
    setSelectedPage(SelectedPage.Appointments)
  }, []);


  return (
    <>
      <section id="profile" className="bg-gray-20 py-3 px-3 md:h-full md:pb-0">
        <div className="md:h-5/6" >
         Appointments
        </div>
      </section>
    </>
  );
}

export default Appointments;

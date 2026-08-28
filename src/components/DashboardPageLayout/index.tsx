// Antes Sessions/Appointments/Chat/Profile repetían literalmente el mismo
// bloque de clases responsive (4 copias). Acá también se limpia la
// repetición innecesaria por breakpoint: como xxxs/xxs comparten valor con
// el siguiente breakpoint real, alcanza con declararlo una vez y dejar que
// la cascada de Tailwind haga el resto.
type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

const DashboardPageLayout: React.FC<Props> = ({ id, children, className = '' }) => (
  <section id={id} className={`mx-auto w-full px-1 py-3 xs:px-4 md:w-5/6 md:px-5 ${className}`}>
    {children}
  </section>
);

export default DashboardPageLayout;

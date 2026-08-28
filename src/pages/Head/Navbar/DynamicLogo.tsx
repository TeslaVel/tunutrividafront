import Logo from "@/assets/ntv/logo_3.png";

const DynamicLogo: React.FC = () => {
  // Antes alternaba entre dos wordmarks según el scroll (uno más oscuro
  // para el estado "top of page" con la foto de fondo vieja). El hero
  // ahora es siempre un gradiente oscuro, así que un solo logo claro
  // (con buen contraste en cualquier estado) alcanza. Tamaño responsive
  // en vez de 280x51px fijo, que se veía sobredimensionado en mobile.
  return (
    <img
      alt="Tunutrivida"
      src={Logo}
      className="h-8 w-auto sm:h-10 md:h-[51px]"
    />
  );
};

export default DynamicLogo;

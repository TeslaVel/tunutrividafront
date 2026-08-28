import React from "react";

type Props = {
  children: React.ReactNode;
  size?: 1 | 2 | 3 | 4 | 5 | 6
  classes?: string
};

// Escala tipográfica real por tamaño (antes los 6 tamaños renderizaban
// exactamente las mismas clases, sin ninguna jerarquía visual real).
const SIZE_CLASSES: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: "font-montserrat font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight",
  2: "font-montserrat font-bold text-3xl sm:text-4xl leading-tight",
  3: "font-montserrat font-bold text-2xl leading-snug",
  4: "font-montserrat font-semibold text-xl leading-snug",
  5: "font-montserrat font-semibold text-lg",
  6: "font-montserrat font-semibold text-base",
};

const HText: React.FC<Props> = ({
  children,
  size = 1,
  classes = ''
}: Props) => {
  const className = `${SIZE_CLASSES[size]} ${classes}`;
  switch (size) {
    case 1:
      return <h1 className={className}>{children}</h1>
    case 2:
      return <h2 className={className}>{children}</h2>
    case 3:
      return <h3 className={className}>{children}</h3>
    case 4:
      return <h4 className={className}>{children}</h4>
    case 5:
      return <h5 className={className}>{children}</h5>
    case 6:
      return <h6 className={className}>{children}</h6>
    default:
      return <h1 className={className}>{children}</h1>
  }
};

export default HText;

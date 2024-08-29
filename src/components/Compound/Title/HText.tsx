import React from "react";

type Props = {
  children: React.ReactNode;
  size?: 1 | 2 | 3 | 4 | 5 | 6
  classes?: string
};

const HText: React.FC<Props> = ({
  children,
  size = 1,
  classes = ''
}: Props) => {
  switch (size) {
    case 1:
      return <h1 className={`basis-3/5 font-montserrat text-3xl font-bold ${classes}`}>{children}</h1>
    case 2:
      return <h2 className={`basis-3/5 font-montserrat text-3xl font-bold ${classes}`}>{children}</h2>
    case 3:
      return <h3 className={`basis-3/5 font-montserrat text-3xl font-bold ${classes}`}>{children}</h3>
    case 4:
      return <h4 className={`basis-3/5 font-montserrat text-3xl font-bold ${classes}`}>{children}</h4>
    case 5:
      return <h5 className={`basis-3/5 font-montserrat text-3xl font-bold ${classes}`}>{children}</h5>
    case 6:
      return <h6 className={`basis-3/5 font-montserrat text-3xl font-bold ${classes}`}>{children}</h6>
    default:
      return <h1 className={`basis-3/5 font-montserrat text-3xl font-bold ${classes}`}>{children}</h1>
  }
};

export default HText;

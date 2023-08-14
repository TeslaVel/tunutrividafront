import Logo1 from "@/assets/ntv/logo.png";
import Logo2 from "@/assets/ntv/logo_3.png";

type Props = {
  isTopOfPage: boolean;
};

const DynamicLogo: React.FC<Props> = ({isTopOfPage}: Props) => {
  if (!isTopOfPage) {
    return <img alt="logo" src={Logo2} style={{width: '280px', height: '51px'}} />
  }

  return <img alt="logo" src={Logo1} style={{width: '280px', height: '51px'}} />
};

export default DynamicLogo;
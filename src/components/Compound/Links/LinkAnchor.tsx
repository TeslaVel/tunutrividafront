import { SelectedPage } from "@/types";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  url: string;
  page: string;
  // toSelect: SelectedPage;
  // setSelectedPage: (value: SelectedPage) => void;// para borrar
  selectedPage?: SelectedPage;
  baseColor?: string
  selectePageColor?: string
  isAnchor?: boolean
  action?: () => void
};

const LinkAnchor: React.FC<Props> = ({
  page,
  url,
  selectedPage,
  // toSelect,
  // setSelectedPage,
  baseColor='text-landing-ink hover:text-landing-primary',
  selectePageColor='text-landing-primary',
  isAnchor=false,
  action
}: Props) => {
  const lowerCasePage = url.toLowerCase().replace(/ /g, "") as SelectedPage;
  // El hover ya lo define baseColor/selectePageColor de cada caller; antes
  // esta clase base pisaba cualquier color que el caller pasara.
  const klazz = `cursor-pointer transition duration-500 ${selectedPage === lowerCasePage ? `${selectePageColor} font-bold` : baseColor} `

  if (!isAnchor) {
    return (
      <a
        className={klazz}
        onClick={ () => action
          ? action()
          : {}}
      >
        {page}
      </a>
    )
  }

  return (
    <AnchorLink
      className={klazz}
      href={`#${lowerCasePage}`}
      onClick={ () => action
        ? action()
        : {}}
    >
      {page}
    </AnchorLink>
  );
};

export default LinkAnchor;

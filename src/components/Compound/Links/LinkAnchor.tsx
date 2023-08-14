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
  baseColor='',
  selectePageColor='text-secondly-female-200 hover:text-secondly-female-300',
  isAnchor=false,
  action
}: Props) => {
  const lowerCasePage = url.toLowerCase().replace(/ /g, "") as SelectedPage;
  const klazz = `cursor-pointer transition duration-500 hover:text-secondly-female-300 ${selectedPage === lowerCasePage ? `${selectePageColor} font-bold` : baseColor} `

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

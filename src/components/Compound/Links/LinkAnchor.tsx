import { SelectedPage } from "@/types";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  url: string;
  page: string;
  selectedPage: SelectedPage;
  toSelect: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  baseColor?: string
  selectePageColor?: string
  custom?: boolean
};

const LinkAnchor = ({
  page,
  url,
  selectedPage,
  toSelect,
  setSelectedPage,
  baseColor = '',
  selectePageColor = 'text-primary-50 hover:primary-100',
  custom
}: Props) => {
  const lowerCasePage = url.toLowerCase().replace(/ /g, "") as SelectedPage;
  const klazz = `cursor-pointer transition duration-500 ${selectedPage === lowerCasePage ? `${selectePageColor} font-bold` : baseColor} `

  if (custom) {
    return (
        <a
        className={klazz}
        onClick={() => setSelectedPage(toSelect)}
      >
        {page} 2
      </a>
    )
  }

  return (
    <AnchorLink
      className={klazz}
      href={`#${lowerCasePage}`}
      onClick={() => setSelectedPage(toSelect)}
    >
      {page}
    </AnchorLink>
  );
};

export default LinkAnchor;

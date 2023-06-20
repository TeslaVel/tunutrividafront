import { SelectedPage } from "@/types";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  url: string;
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  baseColor?: string
  selectePageColor?: string
};

const LinkAnchor = ({
  page,
  url,
  selectedPage,
  setSelectedPage,
  baseColor = '',
  selectePageColor = 'text-primary-50 hover:primary-100'
}: Props) => {
  const lowerCasePage = url.toLowerCase().replace(/ /g, "") as SelectedPage;

  return (
    <AnchorLink
      className={`${selectedPage === lowerCasePage ? `${selectePageColor} font-bold` : baseColor}
        transition duration-500
      `}
      href={`#${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
    </AnchorLink>
  );
};

export default LinkAnchor;

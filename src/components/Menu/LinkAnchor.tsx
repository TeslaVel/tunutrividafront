import { SelectedPage } from "@/shared/types";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  url: string;
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const LinkAnchor = ({ page, url, selectedPage, setSelectedPage }: Props) => {
  const lowerCasePage = url.toLowerCase().replace(/ /g, "") as SelectedPage;

  return (
    <AnchorLink
      className={`${selectedPage === lowerCasePage ? "text-purple-20 font-bold drop-shadow" : "text-purple-200"}
        transition duration-500 hover:text-purple-20 hover:drop-shadow
      `}
      href={`#${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
    </AnchorLink>
  );
};

export default LinkAnchor;

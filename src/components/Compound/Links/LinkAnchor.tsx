import { SelectedPage } from "@/types";
// import AnchorLink from "react-anchor-link-smooth-scroll";
// import { Link } from 'react-router-dom';


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
  selectePageColor = 'text-purple-200 hover:text-purple-300',
  custom
}: Props) => {
  const lowerCasePage = url.toLowerCase().replace(/ /g, "") as SelectedPage;
  const klazz = `cursor-pointer transition duration-500 hover:text-purple-300 ${selectedPage === lowerCasePage ? `${selectePageColor} font-bold` : baseColor} `

  return (
    <a
      className={klazz}
      onClick={() => setSelectedPage(toSelect)}
    >
      {page}
    </a>
  )

  // return (
  //   <AnchorLink
  //     className={klazz}
  //     href={`#${lowerCasePage}`}
  //     onClick={() => setSelectedPage(toSelect)}
  //   >
  //     {page}
  //   </AnchorLink>
  // );
};

export default LinkAnchor;

import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { SelectedPage } from "./types";

type Props = {
  children: React.ReactNode;
  setSelectedPage: (value: SelectedPage) => void;
  selectedPage: SelectedPage;
};

const ActionButton = ({ children, setSelectedPage, selectedPage }: Props) => {
  return (
    <AnchorLink
      className="rounded-md px-5 py-2 bg-purple-15 hover:bg-purple-50 hover:text-white"
      onClick={() => setSelectedPage(selectedPage)}
      href={`#${selectedPage}`}
    >
      {children}
    </AnchorLink>
  );
};

export default ActionButton;

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
      className="rounded-md bg-primary-300 px-5 py-2 hover:bg-primary-500 hover:text-white"
      onClick={() => setSelectedPage(selectedPage)}
      href={`#${selectedPage}`}
    >
      {children}
    </AnchorLink>
  );
};

export default ActionButton;

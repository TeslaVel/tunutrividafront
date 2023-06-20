import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { SelectedPage } from "@/types";

type Props = {
  children: React.ReactNode;
  setSelectedPage: (value: SelectedPage) => void;
  selectedPage: SelectedPage;
  baseColor?: string
};

const ActionButton = ({ children, setSelectedPage, selectedPage, baseColor}: Props) => {
  return (
    <AnchorLink
      className={`rounded-md px-5 py-2 ${baseColor}`}
      onClick={() => setSelectedPage(selectedPage)}
      href={`#${selectedPage}`}
    >
      {children}
    </AnchorLink>
  );
};

export default ActionButton;

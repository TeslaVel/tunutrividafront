import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { SelectedPage } from "@/types";
import './ActionButton.css'

type Props = {
  children: React.ReactNode;
  setSelectedPage: (value: SelectedPage) => void;
  selectedPage: SelectedPage;
  toSelect: SelectedPage;
  baseColor?: string
};

const ActionButton = ({ children, setSelectedPage, selectedPage, toSelect, baseColor}: Props) => {
  return (
    <AnchorLink
      className={`ntv-custom-button-shadow rounded-sm px-5 py-2 ${baseColor}`}
      onClick={() => setSelectedPage(toSelect)}
      href={`#${selectedPage}`}
    >
      {children}
    </AnchorLink>
  );
};

export default ActionButton;

import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { SelectedPage } from "@/types";
import './ActionButton.css'

type Props = {
  children: React.ReactNode;
  setSelectedPage: (value: SelectedPage) => void;
  selectedPage: SelectedPage;
  baseColor?: string
  action?: () => void
};

const ActionButton = ({ children, setSelectedPage, selectedPage, baseColor, action}: Props) => {

  if (action) {
    return <button
      onClick={action}
      className={`ntv-custom-shadow rounded-sm px-5 py-2 ${baseColor}`}
    >
      {children}
    </button>
  }

  return (
    <AnchorLink
      className={`ntv-custom-shadow rounded-sm px-5 py-2 ${baseColor}`}
      onClick={() => setSelectedPage(selectedPage)}
      href={`#${selectedPage}`}
    >
      {children}
    </AnchorLink>
  );
};

export default ActionButton;

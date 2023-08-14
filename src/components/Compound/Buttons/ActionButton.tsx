import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { SelectedPage } from "@/types";
import './ActionButton.css'

type Props = {
  children: React.ReactNode;
  // setSelectedPage?: (value: SelectedPage) => void;
  selectedPage?: SelectedPage;
  toSelect?: SelectedPage;
  baseColor?: string
  type?: string
  action?: () => void
};

const ActionButton: React.FC<Props> = ({ children, selectedPage = SelectedPage.Home, toSelect = SelectedPage.Home, baseColor, action, type = 'link'}: Props) => {
  if (type === 'button') {
    return (
      <button
        className={`ntv-custom-button-shadow rounded-sm px-5 py-2 ${baseColor}`}
        onClick={ () => action
          ? action()
          : {}}
      >
        {children}
      </button>
    );
  }

  return (
    <AnchorLink
      className={`ntv-custom-button-shadow rounded-sm px-5 py-2 ${baseColor}`}
      onClick={ () => action
        ? action()
        : {}}
      href={`#${selectedPage}`}
    >
      {children}
    </AnchorLink>
  );
};

export default ActionButton;

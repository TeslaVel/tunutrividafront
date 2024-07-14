import React from 'react';

// types
import { ThemeType } from "@/types";

type Props = {
  setOptionSelected: (value: string) => void;
  theme: ThemeType
  optionSelected: string;
};

interface TopBarOption {
  label: string,
  value: string,
  visible: boolean
}

const tapOptions: TopBarOption[] = [
  { label: 'Dashboard', value: 'dashboard', visible: true},
  { label: 'Entries', value: 'entries', visible: true},
  { label: 'Goals', value: 'goals', visible: false}
];

const TopBar: React.FC<Props> = ({ setOptionSelected, optionSelected, theme}: Props) => {
  return (
    <>
      {
        tapOptions.map( (opt: TopBarOption, index: number) => {
          if (!opt.visible) return

          return <span key={`${index}-${opt}`}
                    className={`h-[30px] cursor-pointer p-2  ${theme?.topBar.optionHover}
                    ${opt.value === optionSelected ? `${theme?.topBar.optionSelected}` : `${theme?.topBar.option}` } `}
                    onClick={() => setOptionSelected(opt.value)}
                  >
                    {opt.label}
                  </span>
        })
      }
    </>
  );
};

export default TopBar;

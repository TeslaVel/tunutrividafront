import React from 'react';

// types
import { UserColors } from "@/types";

type Props = {
  setOptionSelected: (value: string) => void;
  userColors: UserColors
  optionSelected: string;
};

interface TopBarOption {
  label: string,
  value: string,
  visible: boolean
}

const tapOptions: TopBarOption[] = [
  { label: 'Dashboard', value: 'dashboard', visible: true},
  { label: 'Entradas', value: 'entries', visible: true},
  { label: 'Metas', value: 'goals', visible: false}
];

const TopBar: React.FC<Props> = ({ setOptionSelected, optionSelected, userColors}: Props) => {
  return (
    <>
      {
        tapOptions.map( (opt: TopBarOption, index: number) => {
          if (!opt.visible) return

          return <span key={`${index}-${opt}`}
                    className={`h-[30px] cursor-pointer p-2  ${userColors?.topBar.optionHover}
                    ${opt.value === optionSelected ? `${userColors?.topBar.optionSelected}` : `${userColors?.topBar.option}` } `}
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

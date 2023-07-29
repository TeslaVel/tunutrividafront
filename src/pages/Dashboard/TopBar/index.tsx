import React from 'react';

// types
import { UserColors } from "@/types";


type Props = {
  setOptionSelected: (value: string) => void;
  userColors: UserColors
  optionSelected: string;
};

const tapOptions = [
  { label: 'Dashboard', value: 'dashboard' },
  { label: 'Entradas', value: 'entries' },
  { label: 'Metas', value: 'goals' }
];

const TopBar = ({ setOptionSelected, optionSelected, userColors}: Props) => {
  return (
    <>
      {
        tapOptions.map( (opt: {[key: string]: string}, index: number) => {
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

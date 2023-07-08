import React from 'react';

type Props = {
  setOptionSelected: (value: string) => void;
  optionSelected: string;
};

const tapOptions = [
  { label: 'Dashboard', value: 'dashboard' },
  { label: 'Entradas', value: 'entries' },
  { label: 'Metas', value: 'goals' }
];

const TopBar = ({ setOptionSelected, optionSelected }: Props) => {
  const classSelected = 'border-b border-purple-300 text-purple-300'

  return (
    <>
      {
        tapOptions.map( (opt: {[key: string]: string}, index: number) => {
          return <span key={`${index}-${opt}`}
                    className={`h-[30px] cursor-pointer p-2 hover:border-b hover:border-purple-300 hover:text-purple-300 ${opt.value === optionSelected ? classSelected : '' } `}
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

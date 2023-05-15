import React from 'react';

type Props = {
  setOptionSelected: () => void;
  optionSelected: string;
};

const tapOptions = [
  'Dashboard',
  'Entries',
  'Goals',
];

const TopBar = ({ setOptionSelected, optionSelected }: Props) => {
  const classSelected = 'border-b border-gray-500 text-gray-500'

  return (
    <>
      {
        tapOptions.map( (opt: string, index: number) => {
          return <span key={`${index}-${opt}`}
                    className={`cursor-pointer p-2 hover:border-b border-transparent hover:border-gray-500 hover:text-gray-500 ${opt === optionSelected ? classSelected : '' } `}
                    onClick={() => setOptionSelected(opt)}
                  >

                    {opt}
                  </span>
        })
      }
    </>
  );
};

export default TopBar;

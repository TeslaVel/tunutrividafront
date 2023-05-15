import React from 'react';

type Props = {
  optionSelected: string;
  handleCableAction: () => void;
};

const SectionWrapper = ({optionSelected, handleCableAction }: Props) => {
   if (optionSelected === 'Dashboard') {
      return (
        <div>
         Esta es la seccion del Dashboard
        <button className="btn btn-primary" onClick={handleCableAction}>Send message to backend</button>
      </div>
      )
    }
    if (optionSelected === 'Entries') {
      return (
        <div>
         Esta es la seccion del Entries
      </div>
      )
    }

    if (optionSelected === 'Goals') {
      return (
        <div>
         Esta es la seccion del Goals
      </div>
      )
    }
};

export default SectionWrapper;

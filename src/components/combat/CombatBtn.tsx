import React from 'react';

const CombatBtn: React.FC<{
  btnFc: { (): void };
  text: string;
}> = ({ btnFc, text }) => {
  return (
    <button type="button" onClick={btnFc}>
      {text}
    </button>
  );
};

export { CombatBtn };

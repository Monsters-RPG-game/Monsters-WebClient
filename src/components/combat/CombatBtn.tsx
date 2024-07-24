import React from 'react';
import { Button } from '../ui/button';

const CombatBtn: React.FC<{
  btnFc: { (): void };
  text: string;
}> = ({ btnFc, text }) => {
  return (
    <Button className="text-lg hover:text-sky-400/50" variant="default" size="lg" type="button" onClick={btnFc}>
      {text}
    </Button>
  );
};

export { CombatBtn };

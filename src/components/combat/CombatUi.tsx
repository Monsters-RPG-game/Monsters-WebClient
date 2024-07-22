import React from 'react';
import { CombatBtn } from './CombatBtn';

const CombatUi: React.FC<{ leave: () => void; action: (target: string) => void; target: string }> = ({
  leave,
  action,
  target,
}) => {
  return (
    <div className="absolute flex-row bottom-20 space-x-2">
      <CombatBtn
        btnFc={() => {
          leave();
        }}
        text="leave"
      />
      <CombatBtn
        btnFc={() => {
          action(target);
        }}
        text="attack"
      />
    </div>
  );
};

export { CombatUi };

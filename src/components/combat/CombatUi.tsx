import React from 'react';
import { CombatBtn } from './CombatBtn';

const CombatUi: React.FC<{ leave: () => void; action: (target: string) => void; target: string }> = ({
  leave,
  action,
  target,
}) => {
  return (
    <div className="h-[25svh] self-center space-x-2">
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

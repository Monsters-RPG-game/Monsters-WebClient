import React, { useEffect } from 'react';
import Terminal from '../../components/Terminal';
import useTerminal from '../../hooks/useTerminal';

const Home: React.FC = () => {
  const { history, pushToHistory, setTerminalRef, resetTerminal } = useTerminal();

  const user = 'Adam';

  const start = (): void => {
    pushToHistory(
      <div>
        <strong>Starting</strong> the server... <span style={{ color: 'green' }}>Done</span>
      </div>,
    );
  };

  const loadStatus = (): void => {
    pushToHistory(
      <>
        <div className="text-normal">
          Welcome
          <span className="text-orange-400 ml-1 mr-1">
            <strong>{user}</strong>
          </span>
          Nice to see You !
        </div>
        <br />
        <div>You can write: &apos;help&apos; , to check list of available commands.</div>
      </>,
    );
  };

  useEffect(() => {
    resetTerminal();

    start();
    loadStatus();
  }, []);

  const help = (): void => {
    pushToHistory(
      <div className="flex flex-col">
        <p className="font-semibold">Here are all the commands you can use:</p>
        <span>- game init</span>
        <span>- alert</span>
        <span>- races</span>
        <span>- profile</span>
        <span>- messages</span>
        <span>- messages</span>
        <span>- sendMsg</span>
        <span>- clear</span>
        <span>- exit</span>
      </div>,
    );
  };

  const alert = (): void => {
    pushToHistory(
      <div>
        <strong>Alert</strong>
        <span style={{ color: 'orange', marginLeft: 10 }}>
          <strong>Shown in the browser</strong>
        </span>
      </div>,
    );
  };

  const helps = (): string[] => [
    'Here are all the commands you can use:',
    '- game init',
    '- alert',
    '- races',
    '- profile',
    '- messages',
    '- sendMsg',
    '- clear',
    '- exit',
  ];

  const commands = {
    help: 'help',
    start: 'start',
  };

  return (
    <div className="h-full w-full flex justify-center">
      <Terminal
        history={history}
        ref={setTerminalRef}
        promptLabel={<div className="text-green-400">You{' >>'}</div>}
        commands={commands}
      />
    </div>
  );
};

export default Home;
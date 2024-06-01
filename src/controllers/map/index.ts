import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import mainScene from './scenes/map';
import type { ICharacterLocationEntity, IMapEntity } from '../../types';
import { getMap } from '../../communication';
import { useAccountStore, useLocationStore, useWebsocketStore } from '../../zustand/store';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  parent: 'game',
  scene: [mainScene],
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: 'matterCollision',
        mapping: 'matterCollision',
      },
    ],
  },
};

const startMap = (): void => {
  new Phaser.Game(config);
};

export const initLocation = async (setMap: React.Dispatch<React.SetStateAction<IMapEntity | undefined>>): Promise<void> => {
  const socketController = useWebsocketStore.getState().controller!;
  const userState = useAccountStore.getState();
  const locationStore = useLocationStore.getState();
  const location = (await socketController.send({
    target: 'movement',
    subTarget: 'get',
    payload: {
      character: userState.account?.id
    }
  })).payload as ICharacterLocationEntity;
  locationStore.initLocation({ x: location.x, y: location.y, map: location.map });

  if (!sessionStorage.getItem('mainMap')) {
    const map = await getMap();
    setMap(map.data.data);
    sessionStorage.setItem('mainMap', JSON.stringify(map.data.data));
  } else {
    setMap(JSON.parse(sessionStorage.getItem('mainMap') as string) as IMapEntity);
  }
};

export default startMap;

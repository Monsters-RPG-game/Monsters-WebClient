export interface IMapObjects {
  height: number;
  id: number;
  name: string;
  point: boolean;
  rotation: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
}

interface IBaseMapLayer {
  id: number;
  x: number;
  y: number;
  name: string;
  type: string;
  opacity: number;
  visible: boolean;
}

export interface IMapLayer extends IBaseMapLayer {
  data: number[];
  height: number;
  width: number;
}

export interface IMapObjectLayer extends IBaseMapLayer {
  draworder: string;
  objects: IMapObjects[];
}

export interface IMapProperties {
  name: string;
  type: string;
  value: string;
}

interface IMapTilesetGrid {
  height: number;
  orientation: string;
  width: number;
}

interface IMapTilesetTerrain {
  name: string;
  tile: number;
}

interface IMapTilesetsTiles {
  id: number;
  properties: {
    name: string;
    type: string;
    value: boolean;
  }[];
}

export interface IMapTilesets {
  columns: number;
  firstgid: number;
  grid: IMapTilesetGrid;
  image: string;
  imageheight: number;
  imagewidth: number;
  margin: number;
  name: string;
  spacing: number;
  terrains: IMapTilesetTerrain[];
  tilecount: number;
  tileheight: number;
  tiles: IMapTilesetsTiles[];
  tilewidth: number;
}

export interface IMapEntity {
  _id: string;
  name: string;
  layers: IMapLayer[] | IMapObjectLayer[];
  nextlayerid: number;
  nextobjectid: number;
  orientation: string;
  properties: IMapProperties[];
  renderorder: string;
  tiledversion: string;
  tileheight: number;
  tilesets: IMapTilesets[];
  tilewidth: number;
  type: string;
  version: number;
  width: number;
}

export interface ICharacterLocationEntity {
  _id: string;
  character: string;
  x: number;
  y: number;
  map: string;
}

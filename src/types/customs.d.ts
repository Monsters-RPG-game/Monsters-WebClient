import type { IDefaultChildren } from './theme';

export interface IContainerProps extends IDefaultChildren {
  $direction?: string;
  $justify?: string;
  $align?: string;
  $wrap?: string;
  $noScroll?: boolean;
}

export interface IHeaderProps extends IDefaultChildren {
  $center?: boolean;
}

export interface ITextProps extends IDefaultChildren {
  $full?: boolean;
}

export interface IInputProps extends IDefaultChildren {
  $full?: boolean;
  $centerText?: boolean;
}

export interface IChatMessageProps extends IDefaultChildren {
  $sender?: boolean;
}

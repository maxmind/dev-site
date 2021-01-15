interface IBaseItem {
  hasDivider?: boolean;
  icon?: React.ReactElement;
  title: string;
}

export interface IInternalItem extends IBaseItem {
  items?: IItem[];
  secondaryItems?: IItem[];
  to: string;
}

export interface IExternalItem extends IBaseItem {
  url: string;
}

export type IItem = IExternalItem | IInternalItem;

export const isInternalItem = (
  item:  IItem
  // eslint-disable-next-line no-prototype-builtins
): item is IInternalItem => item.hasOwnProperty('to');

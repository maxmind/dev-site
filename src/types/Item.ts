interface IBaseItem {
  className?: string;
  icon?: React.ReactElement;
  items?: IItem[];
  secondaryItems?: IItem[];
  title: string;
}

export interface IInternalItem extends IBaseItem {
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

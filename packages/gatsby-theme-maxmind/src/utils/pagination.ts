import findIndex from 'lodash.findindex';

import navigation from '../../content1/navigation';
import {
  IInternalItem,
  IItem,
  isInternalItem,
} from '../types/Item';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flattenDeep = (arr: any[]) : any[] => Array.isArray(arr)
  ? arr.reduce( (a, b) => a.concat(flattenDeep(b)) , [])
  : [
    arr,
  ];

const flattenTree = (tree: IItem[]) : IInternalItem[] => flattenDeep(
  tree.map((node: IItem) => {
    if (!isInternalItem(node)) {
      return [];
    }

    return [
      node,
      ...(node.items ? flattenTree(node?.items) : []),
      ...(node.secondaryItems ? flattenTree(node?.secondaryItems) : []),
    ];
  }));

const flattenedNav = flattenTree(navigation);

const findNodeIndex = (currentPath: string): number => findIndex(
  flattenedNav,
  (item: IInternalItem) => item.to === currentPath.replace(/\/$/, '')
);

export const getPreviousPage = (currentPath: string): void | IInternalItem => {
  const nodeIndex = findNodeIndex(currentPath);

  if (flattenedNav[nodeIndex - 1]) {
    return flattenedNav[nodeIndex - 1];
  }
};

export const getNextPage = (currentPath: string): void | IInternalItem => {
  const nodeIndex = findNodeIndex(currentPath);

  if (flattenedNav[nodeIndex + 1]) {
    return flattenedNav[nodeIndex + 1];
  }
};

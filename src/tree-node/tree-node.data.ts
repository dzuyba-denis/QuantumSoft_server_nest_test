import { TreeNode } from './tree-node.type';
export const treeNodesInit: TreeNode[] = [
  {
    id: '1',
    parentid: null,
    value: 'Node 1',
    deleted: false,
  },
  {
    id: '2',
    parentid: '1',
    value: 'Node 2',
    deleted: false,
  },
  {
    id: '3',
    parentid: '1',
    value: 'Node 3',
    deleted: false,
  },
  {
    id: '4',
    parentid: '3',
    value: 'Node 4',
    deleted: false,
  },
  {
    id: '5',
    parentid: '1',
    value: 'Node 5',
    deleted: false,
  },
  {
    id: '6',
    parentid: '5',
    value: 'Node 6',
    deleted: false,
  },
  {
    id: '7',
    parentid: '6',
    value: 'Node 7',
    deleted: false,
  },
];

import { Injectable, NotFoundException } from '@nestjs/common';
import { TreeNode } from './tree-node.type';
import { treeNodesInit } from './tree-node.data';
import { TreeNodeApplyDto } from './tree-node.dto';

@Injectable()
export class TreeNodeService {
  treeNodes: TreeNode[] = structuredClone(treeNodesInit);

  private getAllChildNodesRecursive(id: string): TreeNode[] {
    const res: TreeNode[] = [];
    const node = this.treeNodes.find((node) => node.id === id);
    if (!node) return [];
    for (let i = 0; i < this.treeNodes.length; i++) {
      if (this.treeNodes[i].parentid === id) {
        const childNodes = this.getAllChildNodesRecursive(this.treeNodes[i].id);
        res.push(...childNodes);
      }
    }
    res.push(node);
    return res;
  }

  private getAllParentNodesRecursive(id: string): TreeNode[] {
    const res: TreeNode[] = [];
    const node = this.treeNodes.find((node) => node.id === id);
    if (!node) return [];

    for (let i = 0; i < this.treeNodes.length; i++) {
      if (this.treeNodes[i].id === node.parentid) {
        const childNodes = this.getAllChildNodesRecursive(this.treeNodes[i].id);
        res.push(...childNodes);
      }
    }
    res.push(node);
    return res;
  }

  private deleteOne(id: string) {
    const childNodes = this.getAllChildNodesRecursive(id);
    this.treeNodes.forEach((node) => {
      if (childNodes.some((n) => n.id === node.id)) node.deleted = true;
    });
  }

  private renameOne(id: string, newValue: string) {
    this.treeNodes.forEach((node) => {
      if (node.id === id) node.value = newValue;
    });
  }

  private addOne(
    newNode: { id: string; parentid: string; value: string },
    newNodes: { id: string; parentid: string; value: string }[],
  ) {
    // Проверяем может уже был добавлен
    const addAlready = this.treeNodes.find((n) => n.id === newNode.id);

    if (addAlready) return;
    // Есть ли родитель из новых узлов то сперва добавляем родителя
    const parentInNew = newNodes.find((n) => n.id === newNode.parentid);
    if (parentInNew) this.addOne(parentInNew, newNodes);
    this.treeNodes.push({ ...newNode, deleted: false });
  }

  getAll(): { data: TreeNode[] } {
    return { data: this.treeNodes };
  }

  reset(): { data: TreeNode[] } {
    this.treeNodes = structuredClone(treeNodesInit);
    return { data: this.treeNodes };
  }

  getOne(id: string): TreeNode {
    const treeNode = this.treeNodes.find((node) => node.id === id);
    if (!treeNode || treeNode.deleted) {
      throw new NotFoundException();
    }
    return treeNode;
  }

  apply(body: TreeNodeApplyDto) {
    if (body.rename)
      for (const rename of body.rename) this.renameOne(rename.id, rename.value);
    if (body.new) for (const newOne of body.new) this.addOne(newOne, body.new);
    if (body.delete) for (const del of body.delete) this.deleteOne(del.id);
    return { ok: true };
  }
}

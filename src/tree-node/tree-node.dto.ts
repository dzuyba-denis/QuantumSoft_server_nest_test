export class TreeNodeApplyDto {
  new?: { id: string; parentid: string; value: string }[];
  rename?: { id: string; value: string }[];
  delete?: { id: string }[];
}

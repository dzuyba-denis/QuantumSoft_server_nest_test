import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TreeNodeService } from './tree-node.service';
import { TreeNodeApplyDto } from './tree-node.dto';

@Controller('tree-nodes')
export class TreeNodeController {
  constructor(private readonly treeNodeService: TreeNodeService) {}

  @Get()
  getAll() {
    return this.treeNodeService.getAll();
  }

  @Get('reset')
  reset() {
    return this.treeNodeService.reset();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.treeNodeService.getOne(id);
  }

  @Post('apply')
  apply(@Body() body: TreeNodeApplyDto) {
    return this.treeNodeService.apply(body);
  }
}

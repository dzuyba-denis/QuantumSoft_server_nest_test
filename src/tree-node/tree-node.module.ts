import { Module } from '@nestjs/common';
import { TreeNodeController } from './tree-node.controller';
import { TreeNodeService } from './tree-node.service';

@Module({
  imports: [],
  controllers: [TreeNodeController],
  providers: [TreeNodeService],
})
export class TreeNodeModule {}

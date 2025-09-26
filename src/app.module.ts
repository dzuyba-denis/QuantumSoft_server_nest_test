import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TreeNodeModule } from './tree-node/tree-node.module';

@Module({
  imports: [TreeNodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

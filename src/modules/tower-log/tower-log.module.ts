import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TowerLog } from './entities/tower-log.entity';
import { TowerLogService } from './tower-log.service';
import { TowerLogController } from './tower-log.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TowerLog])],
  controllers: [TowerLogController],
  providers: [TowerLogService],
  exports: [TypeOrmModule], // opcional: si otro módulo necesita el repo
})
export class TowerLogModule {}
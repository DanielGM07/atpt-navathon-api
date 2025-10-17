import { PartialType } from '@nestjs/mapped-types';
import { CreateTowerLogDto } from './create-tower-log.dto';

export class UpdateTowerLogDto extends PartialType(CreateTowerLogDto) {}

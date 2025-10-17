import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsNumber } from 'class-validator';

export class CreateTowerLogDto {
  @IsDate()
  @Type(() => Date)
  log_time: Date;

  @IsInt()
  ph: number;

  @IsNumber()
  temperature: number;

  @IsInt()
  humidity: number;

  @IsInt()
  light: number;

  @IsBoolean()
  min_water: boolean;
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TowerLogService } from './tower-log.service';
import { CreateTowerLogDto } from './dto/create-tower-log.dto';
import { UpdateTowerLogDto } from './dto/update-tower-log.dto';

@Controller('tower-log')
export class TowerLogController {
  constructor(private readonly towerLogService: TowerLogService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createTowerLogDto: CreateTowerLogDto) {
    return await this.towerLogService.create(createTowerLogDto);
  }

  @Get()
  async findAll() {
    return await this.towerLogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.towerLogService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTowerLogDto: UpdateTowerLogDto,
  ) {
    return await this.towerLogService.update(id, updateTowerLogDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.towerLogService.remove(id);
  }
}

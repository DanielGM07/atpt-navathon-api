import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TowerLog } from './entities/tower-log.entity';
import { CreateTowerLogDto } from './dto/create-tower-log.dto';
import { UpdateTowerLogDto } from './dto/update-tower-log.dto';

@Injectable()
export class TowerLogService {
  constructor(
    @InjectRepository(TowerLog)
    private readonly towerLogRepository: Repository<TowerLog>,
  ) {}

  async create(createTowerLogDto: CreateTowerLogDto): Promise<TowerLog> {
    try {
      const entity = this.towerLogRepository.create(createTowerLogDto);
      return await this.towerLogRepository.save(entity);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<TowerLog[]> {
    try {
      return await this.towerLogRepository.find({
        order: { log_time: 'DESC' },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<TowerLog> {
    try {
      const log = await this.towerLogRepository.findOneBy({ id });
      if (!log) {
        throw new NotFoundException(`TowerLog with ID ${id} not found`);
      }
      return log;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateTowerLogDto: UpdateTowerLogDto,
  ): Promise<TowerLog> {
    try {
      const result = await this.towerLogRepository.update(id, updateTowerLogDto);
      if (result.affected === 0) {
        throw new NotFoundException(`TowerLog with ID ${id} not found`);
      }

      const updated = await this.towerLogRepository.findOneBy({ id });
      if (!updated) {
        throw new NotFoundException(
          `TowerLog with ID ${id} not found after update`,
        );
      }

      return updated;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const result = await this.towerLogRepository.softDelete({ id });
      if (result.affected === 0) {
        throw new NotFoundException(`TowerLog with ID ${id} not found`);
      }
      return { message: `TowerLog with ID ${id} successfully deleted` };
    } catch (error) {
      throw error;
    }
  }

  async findLatest(): Promise<TowerLog> {
    const [latest] = await this.towerLogRepository.find({
      where: {},                       // excluye soft-deleted por defecto
      order: { log_time: 'DESC' },     // último por fecha
      take: 1,
    });

    if (!latest) {
      throw new NotFoundException('No tower logs found');
    }

    return latest;
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UtilsService } from '../utils/utils.service';
import { Issue } from 'src/issues/issues.entity';

@Injectable()
export class StatusService {
  constructor(
    private readonly utilsService: UtilsService,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async getAllStatus(xml?: string): Promise<Status[] | string> {
    const statuses = await this.statusRepository.find();
    if (xml === 'true') {
      const jsonformatted = JSON.stringify({ Statuses: statuses });
      return this.utilsService.convertJSONtoXML(jsonformatted);
    }
    return statuses;
  }

  async getStatus(id: number, xml?: string): Promise<Status | string> {
    const status = await this.statusRepository.findOneBy({ id_status: id });
    if (!status) {
      throw new HttpException('Status not found', HttpStatus.NOT_FOUND);
    }
    if (xml === 'true') {
      const jsonformatted = JSON.stringify(status);
      return this.utilsService.convertJSONtoXML(jsonformatted);
    }
    return status;
  }

  async createStatus(
    createStatusDto: CreateStatusDto,
  ): Promise<{ message: string }> {
    const status = this.statusRepository.create({
      description: createStatusDto.description,
      issues: (createStatusDto.issues || []).map(
        (issueId) => ({ id_issue: issueId }) as unknown as Issue,
      ),
    });
    await this.statusRepository.save(status);
    return { message: 'Status creado con éxito' };
  }

  async updateStatus(
    id: number,
    updateStatusDto: UpdateStatusDto,
  ): Promise<Status> {
    const existingStatus = await this.statusRepository.findOneBy({
      id_status: id,
    });

    if (!existingStatus) {
      throw new HttpException('Status no encontrado', HttpStatus.NOT_FOUND);
    }

    const updatedStatus = this.statusRepository.merge(
      existingStatus,
      updateStatusDto,
    );
    return this.statusRepository.save(updatedStatus);
  }

  async deleteStatus(id: number): Promise<{ message: string }> {
    const result = await this.statusRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Status not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Status eliminado con éxito' };
  }
}

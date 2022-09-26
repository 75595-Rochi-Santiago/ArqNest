import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { CreateEstablishmentDto } from '@modules/establishment/dto/create-establishment.dto';
import { Establishment } from '@modules/establishment/entities/establishment.entity';

export class EstablishmentRepository {
  constructor(
    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,
  ) {}

  async createByExcel(establishment: CreateEstablishmentDto[]) {
    try {
      await this.establishmentRepository.save(establishment as any);
    } catch (error) {
      return new Error(error);
    }

    return 'Excel Loaded Successfully';
  }

  async findMultipleEstablishments(establishmentIds: number[]) {
    return await this.establishmentRepository.findBy({
      id: In(establishmentIds),
    });
  }

  async getAllEstablishments() {
    return await this.establishmentRepository.find();
  }

  async findEstablishmentByCUE(CUE: string, Anexo: string) {
    const establishment = await this.establishmentRepository.findOne({
      select: {
        id: true,
        jurisdictional_regulation: true,
        educational_portfolio: true,
        area_or_department: true,
        cue: true,
        annexed: true,
        establishment_name: true,
        address: true,
        city: true,
        province: true,
      },
      where: {
        cue: CUE,
        annexed: Anexo,
      },
    });
    delete establishment.id;
    delete establishment.study_plan;
    return establishment;
  }
}

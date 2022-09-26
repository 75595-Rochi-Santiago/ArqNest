import { Injectable } from '@nestjs/common';
import { readFile, utils } from 'xlsx';
import { unlink } from 'fs/promises';

import { EstablishmentRepository } from '@modules/establishment/repositories/establishment.repository';
import { GetEstablishmentDto } from '@modules/establishment/dto/get-establishment.dto';

@Injectable()
export class EstablishmentService {
  constructor(private establishmentRepository: EstablishmentRepository) {}

  async createEstablishment() {
    const path = 'data/establishments.xlsx';

    const excel = readFile(path);
    const sheetsNames = excel.SheetNames;
    const data = utils.sheet_to_json(excel.Sheets[sheetsNames[1]], {
      raw: true,
      defval: null,
    }); //sheetsNames[1]->caso unico, depende del formato del excel

    const establishments = [];
    for (const rowItem of data) {
      establishments.push({
        situation: rowItem['SITUACIÓN'],
        jurisdictional_regulation: rowItem['NORMATIVA JURISDICCIONAL'],
        educational_portfolio: rowItem['CARTERA EDUCATIVA'],
        management: rowItem['GESTIÓN'],
        area_or_department: rowItem['ÁREA O DEPENDENCIA'],
        cue_annexed: `${rowItem['CUE']}:${rowItem['ANEXO']}`,
        cue: rowItem['CUE'],
        annexed: rowItem['ANEXO'],
        establishment_name: rowItem['NOMBRE DEL ESTABLECIMIENTO'],
        turn: rowItem['TURNO'],
        province: rowItem['PROVINCIA'],
        city: rowItem['CIUDAD'],
        postal_code: rowItem['CÓDIGO POSTAL'],
        address: rowItem['DOMICILIO'],
        mail: rowItem['MAIL'],
      });
    }

    unlink(path);

    return await this.establishmentRepository.createByExcel(establishments);
  }

  async findMultipleEstablishments(establishmentIds: number[]) {
    return await this.establishmentRepository.findMultipleEstablishments(
      establishmentIds,
    );
  }

  async getAllEstablishments() {
    return await this.establishmentRepository.getAllEstablishments();
  }

  async getEstablishmentByCUE(getEstablishmentDto: GetEstablishmentDto) {
    const { CUE, Anexo } = getEstablishmentDto;

    return await this.establishmentRepository.findEstablishmentByCUE(
      CUE,
      Anexo,
    );
  }
}

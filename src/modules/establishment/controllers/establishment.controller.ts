import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

import { RequirePermissions } from '@modules/authorization/decorators/require-permissions.decorator';
import { PermissionsGuard } from '@modules/authorization/guards/permissions.guard';
import { JwtGuard } from '@modules/auth/guards/jwt.guard';
import { EstablishmentService } from '@modules/establishment/services/establishment.service';
import { Establishment } from '@modules/establishment/entities/establishment.entity';
import { EPermissionsEstablishment } from '@modules/establishment/enums/permissions-establishment.enum';

@ApiTags('establishment')
@UseGuards(JwtGuard, PermissionsGuard)
@Controller('establishment')
@UseGuards(JwtGuard, PermissionsGuard)
export class EstablishmentController {
  constructor(private establishmentService: EstablishmentService) {}

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'data',
        filename: function (req, file, cb) {
          cb(null, 'establishments.xlsx');
        },
      }),
    }),
  )
  @Post()
  @ApiCreatedResponse({
    description: 'Cargar establecimientos por excel',
    type: Establishment,
  })
  async createEstablishments(@UploadedFile() file: Express.Multer.File) {
    return await this.establishmentService.createEstablishment();
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Lista de establecimientos',
    type: [Establishment],
  })
  @RequirePermissions(EPermissionsEstablishment.ReadEstablishment)
  async getAllEstablishments() {
    return await this.establishmentService.getAllEstablishments();
  }
}

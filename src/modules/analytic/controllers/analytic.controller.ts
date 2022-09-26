import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { EPermissionsAnalytic } from '@modules/analytic/enums/permissions-analytic.enum';
import { RequirePermissions } from '@modules/authorization/decorators/require-permissions.decorator';
import { PermissionsGuard } from '@modules/authorization/guards/permissions.guard';
import { JwtGuard } from '@modules/auth/guards/jwt.guard';
import { AnalyticService } from '@modules/analytic/services/analytic.service';
import { CreateAnalyticStudentDto } from '@modules/analytic/dto/create-analytic-student.dto';
import { IdAnalitycalStatusDto } from '@modules/analytic/dto/find-analytics-by-status';
import { GetAnalyticsDto } from '@modules/analytic/dto/get-analytics.dto';
import { AnalitycalByStudentDto } from '@modules/analytic/dto/find-analytics-by-student.dto';

@ApiTags('analytic')
@UseGuards(JwtGuard, PermissionsGuard)
@Controller('analytic')
@ApiHeader({
  name: 'Authorization',
  description: 'Recurso para acceder a los datos del usuario logueado',
  example: 'Bearer <token>',
})
@UseGuards(JwtGuard, PermissionsGuard)
export class AnalyticController {
  constructor(
    private analyticService: AnalyticService,
    private configService: ConfigService,
  ) {}

  private pathUrl = this.configService.get<string>('BE_HOST_PATH');

  @Get()
  @ApiResponse({
    description: 'Obtener lista de analiticos paginada',
  })
  @RequirePermissions(EPermissionsAnalytic.ReadAnalytic)
  async getAllUsers(@Query() getAnalyticsDto: GetAnalyticsDto) {
    try {
      const route = `${this.pathUrl}/analytic`;
      return await this.analyticService.getAllAnalytics(getAnalyticsDto, route);
    } catch (error) {
      throw new InternalServerErrorException(`Error interno: 55513`);
    }
  }

  @Post()
  @ApiOkResponse({
    description: 'Crear un analitico',
    type: CreateAnalyticStudentDto,
  })
  @RequirePermissions(EPermissionsAnalytic.CreateAnalytic)
  async createAnalytic(
    @Body() createAnalyticStudentDto: CreateAnalyticStudentDto,
  ) {
    return await this.analyticService.createAnalyticStudent(
      createAnalyticStudentDto,
    );
  }

  @Patch(':id')
  async updateAnalytic(
    @Param() id: number,
    @Body() createAnalyticStudentDto: CreateAnalyticStudentDto,
  ) {
    return {
      id,
      ...createAnalyticStudentDto,
    };
  }

  @Get('robot/detail')
  @RequirePermissions(EPermissionsAnalytic.ReadAnalytic)
  @ApiOkResponse({
    description: 'Analitico segun el alumno',
    type: 'string',
  })
  async getAnalyticByStudent(
    @Query() analitycalByStudentDto: AnalitycalByStudentDto,
  ) {
    return await this.analyticService.getAnalyticByStudentDocument(
      analitycalByStudentDto,
    );
  }

  @Get('analyticsStatus')
  @RequirePermissions(EPermissionsAnalytic.ReadAnalytic)
  @ApiOkResponse({
    description: 'Todos los estados de analitico',
    type: '',
  })
  async getAllAnalyticsStatus() {
    return await this.analyticService.getAllAnalyticStatus();
  }
}

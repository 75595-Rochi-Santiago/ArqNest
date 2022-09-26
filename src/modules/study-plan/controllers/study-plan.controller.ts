import {
  Controller,
  Body,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { RequirePermissions } from '@modules/authorization/decorators/require-permissions.decorator';
import { PermissionsGuard } from '@modules/authorization/guards/permissions.guard';
import { JwtGuard } from '@modules/auth/guards/jwt.guard';
import { CreateStudyPlanDto } from '@modules/study-plan/dto/create-study-plan.dto';
import { UpdateStudyPlanDto } from '@modules/study-plan/dto/update-study-plan.dto';
import { StudyPlanFilterNameDto } from '@modules/study-plan/dto/find-by-name.dto';
import { StudyPlanFilterStatusDto } from '@modules/study-plan/dto/find-by-status.dto';
import { StudyPlanService } from '@modules/study-plan/services/study-plan.service';
import { StudyPlan } from '@modules/study-plan/entities/study-plan.entity';
import { EPermissionsStudyPlan } from '@modules/study-plan/enums/permissions-study_plan.enum';

@ApiTags('studyPlans')
@UseGuards(JwtGuard, PermissionsGuard)
@Controller('studyPlans')
export class StudyPlanController {
  constructor(private studyPlanService: StudyPlanService) {}

  @Get('GetAllStudyPlans')
  @RequirePermissions(EPermissionsStudyPlan.ReadStudyPlan)
  @ApiOkResponse({
    description: 'Todos los planes de estudio',
    type: [StudyPlan],
  })
  async getAllStudyPlans() {
    return await this.studyPlanService.getAllStudyPlans();
  }

  @Get()
  @RequirePermissions(EPermissionsStudyPlan.ReadUniqueStudyPlan)
  @ApiOkResponse({
    description: 'Retorna un plan de estudio',
    type: [StudyPlan],
  })
  async getOneStudyPlanByName(@Query() studyPlan: StudyPlanFilterNameDto) {
    return await this.studyPlanService.getOneStudyPlanByName(studyPlan);
  }

  @Post()
  @RequirePermissions(EPermissionsStudyPlan.CreateStudyPlan)
  @ApiCreatedResponse({
    description: 'Crear un plan de estudio',
    type: [StudyPlan],
  })
  async CreateStudyPlan(@Body() createStudyPlanDto: CreateStudyPlanDto) {
    return await this.studyPlanService.createStudyPlan(createStudyPlanDto);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'data',
        filename: function (req, file, cb) {
          cb(null, 'studyPlans.xlsx');
        },
      }),
    }),
  )
  @Post('loadExcel')
  @RequirePermissions(EPermissionsStudyPlan.CreateStudyPlan)
  @ApiCreatedResponse({
    description: 'Cargar planes de estudio por excel',
    type: StudyPlan,
  })
  async createStudyPlans(@UploadedFile() file: Express.Multer.File) {
    return await this.studyPlanService.createStudyPlanByExcel();
  }
}

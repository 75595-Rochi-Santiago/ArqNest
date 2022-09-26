import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateTaskDto } from '@modules/task/dto/create-task.dto';
import { FindOneParams } from '@modules/task/dto/find-one-params.dto';
import { UpdateTaskDto } from '@modules/task/dto/update-task.dto';
import { TaskService } from '@modules/task/services/task.service';
import { Task } from '@modules/task/entities/task.entity';
import { EPermissionsTasks } from '@modules/task/enums/permissions-tasks.enum';
import { RequirePermissions } from '@modules/authorization/decorators/require-permissions.decorator';
import { PermissionsGuard } from '@modules/authorization/guards/permissions.guard';
import { JwtGuard } from '@modules/auth/guards/jwt.guard';

@ApiTags('task')
@UseGuards(JwtGuard, PermissionsGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @RequirePermissions(EPermissionsTasks.ReadTask)
  @ApiOkResponse({
    description: 'Todas las tareas',
    type: [Task],
  })
  async getAllTask() {
    return await this.taskService.getAllTask();
  }

  @Get(':id')
  @RequirePermissions(EPermissionsTasks.ReadUniqueTask)
  @ApiOkResponse({
    description: 'Buscar una tarea por id',
    type: Task,
  })
  async getTaskById(@Param() findOneParams: FindOneParams) {
    return await this.taskService.getTaskById(findOneParams);
  }

  @Post()
  @RequirePermissions(EPermissionsTasks.CreateTask)
  @ApiCreatedResponse({
    description: 'Crear una tarea',
    type: Task,
  })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  @RequirePermissions(EPermissionsTasks.UpdateTask)
  @ApiOkResponse({
    description: 'Actualizar una tarea por id',
    type: Task,
  })
  async updateTask(
    @Param() findOneParams: FindOneParams,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.taskService.updateTask(findOneParams, updateTaskDto);
  }

  @Delete(':id')
  @RequirePermissions(EPermissionsTasks.DeleteTask)
  @ApiOkResponse({
    description: 'Eliminar un tarea por id',
  })
  async deleteTask(@Param() findOneParams: FindOneParams) {
    return await this.taskService.deleteTask(findOneParams);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskController } from '@modules/task/controllers/task.controller';
import { Task } from '@modules/task/entities/task.entity';
import { TaskRepository } from '@modules/task/repositories/task.repository';
import { TaskService } from '@modules/task/services/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}

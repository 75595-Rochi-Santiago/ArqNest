import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository } from '@modules/task/repositories/task.repository';
import { CreateTaskDto } from '@modules/task/dto/create-task.dto';
import { FindOneParams } from '@modules/task/dto/find-one-params.dto';
import { UpdateTaskDto } from '@modules/task/dto/update-task.dto';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async getAllTask() {
    return await this.taskRepository.findAll();
  }

  async getTaskById({ id }: FindOneParams) {
    const task = await this.taskRepository.findOne(id);
    if (!task)
      throw new NotFoundException(`No se encontró la tarea con el id ${id}`);

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return await this.taskRepository.create(createTaskDto as Task);
  }

  async updateTask({ id }: FindOneParams, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update(id, updateTaskDto as Task);
  }

  async deleteTask({ id }: FindOneParams) {
    const task = await this.taskRepository.findOne(id);
    if (!task)
      throw new NotFoundException(`No se encontro la tarea con el id ${id}`);

    await this.taskRepository.delete(id);
  }
}

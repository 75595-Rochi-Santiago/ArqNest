import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto } from '@modules/task/dto/create-task.dto';
import { UpdateTaskDto } from '@modules/task/dto/update-task.dto';
import { Task } from '@modules/task/entities/task.entity';

export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll() {
    return await this.tasksRepository.find();
  }

  async findOne(id: number) {
    return await this.tasksRepository.findOneBy({ id });
  }

  async create(createTask: Task) {
    return await this.tasksRepository.save(createTask);
  }

  async update(id: number, updateTask: Task) {
    await this.tasksRepository.update(id, updateTask);
    return await this.findOne(id);
  }

  async delete(id: number) {
    return await this.tasksRepository.delete(id);
  }
}

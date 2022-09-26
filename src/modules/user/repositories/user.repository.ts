import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { CreateUserGoogleDto } from '@modules/user/dto/create-user-google.dto';
import { User } from '@modules/user/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserGoogleDto: CreateUserGoogleDto) {
    return await this.usersRepository.save({
      ...createUserGoogleDto,
    });
  }

  async findUserRegisteredGoogle(email: string, accessToken: string) {
    return await this.usersRepository.findOne({
      where: [{ email }, { google_access_token: accessToken }],
    });
  }

  async findUser(userId: number) {
    return await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: [
        'user_roles_user',
        'user_roles_user.user_roles_role',
        'user_roles_user.user_roles_role.role_default_actions',
        'user_establishments',
        'user_establishments.users_establishment',
      ],
    });
  }

  async updateUser(user: User) {
    const { id } = user;
    return await this.usersRepository.update(id, user);
  }

  async getAllUsers(
    options: IPaginationOptions,
    term: string,
  ): Promise<Pagination<User>> {
    return paginate<User>(
      this.usersRepository,
      options,
      term
        ? {
            where: [{ last_name: term }, { first_name: term }, { email: term }],
            relations: [
              'user_roles_user',
              'user_roles_user.user_roles_role',
              'user_roles_user.user_roles_role.role_default_actions',
              'user_establishments',
              'user_establishments.users_establishment',
            ],
          }
        : {
            relations: [
              'user_roles_user',
              'user_roles_user.user_roles_role',
              'user_roles_user.user_roles_role.role_default_actions',
              'user_establishments',
              'user_establishments.users_establishment',
            ],
          },
    );
  }

  async deleteUser(userId: number) {
    try {
      return await this.usersRepository.softDelete(userId);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(`Error: 21615`);
    }
  }
}

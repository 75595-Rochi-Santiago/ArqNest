import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

import { UserRepository } from '@modules/user/repositories/user.repository';
import { CreateUserGoogleDto } from '@modules/user/dto/create-user-google.dto';
import { User } from '@modules/user/entities/user.entity';
import { GetUsersDto } from '@modules/user/dto/get-users.dto';
import { mapUserProfile } from '@modules/user/utils/map-user-profile.utils';
import { FindOneParamsDto } from '@modules/user/dto/find-one-params.dto';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async createUserByGoogle(
    createUserGoogleDto: CreateUserGoogleDto,
  ): Promise<User> {
    return await this.usersRepository.createUser(createUserGoogleDto);
  }

  async findUserRegisteredGoogle(email: string, accessToken: string) {
    return await this.usersRepository.findUserRegisteredGoogle(
      email,
      accessToken,
    );
  }

  async findUser(userId: number) {
    return await this.usersRepository.findUser(userId);
  }

  async getUserProfile(userId: number) {
    const user = await this.usersRepository.findUser(userId);
    return mapUserProfile(user);
  }

  async updateUser(user: User) {
    return await this.usersRepository.updateUser(user);
  }

  async getAllUsers(getUsersDto: GetUsersDto, route: string) {
    const { limit: limitQuery, page, term } = getUsersDto;

    const limit = limitQuery > 100 ? 100 : limitQuery;

    const options: IPaginationOptions = {
      limit,
      page,
      route,
    };

    return await this.usersRepository.getAllUsers(options, term);
  }

  async deleteUser({ id: userId }: FindOneParamsDto) {
    const findUser = await this.usersRepository.findUser(userId);
    if (!findUser) throw new NotFoundException(`User #${userId} not found`);

    const { affected } = await this.usersRepository.deleteUser(findUser.id);

    if (!affected)
      throw new InternalServerErrorException('Error deleting user');
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UserService } from '@modules/user/services/user.service';
import { AssignRoleDto } from '@modules/authorization/dto/assign-actions.dto';
import { AuthorizationRepository } from '@modules/authorization/repositories/authorization.repository';
import { EstablishmentService } from '@modules/establishment/services/establishment.service'

@Injectable()
export class AuthorizationService {
  constructor(
    private authorizationRepository: AuthorizationRepository,
    private userService: UserService,
    private establishmentService: EstablishmentService,
  ) {}

  async assignRole(assignRole: AssignRoleDto) {

    const { establishments, roles, user_id } = assignRole;
    let user = await this.userService.findUser(user_id);

    if (!user) throw new NotFoundException('User not found');

    const findRoles = await this.authorizationRepository.findMultiplesRoles(roles);

    if(!findRoles) throw new InternalServerErrorException('Roles not found');

    if(findRoles.length !== roles.length) throw new InternalServerErrorException('Roles not found or invalid');

    const findEstablishments = await this.establishmentService.findMultipleEstablishments(establishments);

    if(!findEstablishments) throw new InternalServerErrorException('Establishments not found');

    if(findEstablishments.length !== establishments.length) throw new InternalServerErrorException('Establishments not found or invalid');

    const assignRoleAndEstablishment = await this.authorizationRepository.assignRoleAndEstablishment(user_id, roles, establishments);

    return assignRoleAndEstablishment;
  }

  async getAllRoles() {
    return await this.authorizationRepository.getAllRoles();
  }

}

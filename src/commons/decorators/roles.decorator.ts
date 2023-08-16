import { ProfileRole } from '@constants/enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: ProfileRole[]) => SetMetadata('roles', roles);

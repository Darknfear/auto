import { ProfileRole, UserStatus } from '@constants/enum';

export interface JwtPayload {
  email: string;
  role: ProfileRole;
  status: UserStatus;
}

import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICustomRequest } from '../interfaces/custom-request';
import { GlobalService } from '@common/context/global.service';

@Injectable()
export class IsUserGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(err, user, _info, context, _status) {
    const request: ICustomRequest = context.switchToHttp().getRequest();

    if (err || !user || (request.profile && user.accountId !== request.profile?.accountId)) {
      throw new UnauthorizedException();
    }
    GlobalService.accountId = user.accountId;

    return user;
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}

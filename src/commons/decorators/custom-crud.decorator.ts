import { createParamDecorator } from '@nestjs/common';

import { PARSED_CRUD_REQUEST_KEY } from '@nestjsx/crud/lib/constants';
import { R } from '@nestjsx/crud/lib/crud';

export const CustomParsedRequest = createParamDecorator((_, ctx): ParameterDecorator => {
  const context = R.getContextRequest(ctx);

  return {
    ...context[PARSED_CRUD_REQUEST_KEY],
    profile: context['profile'],
    user: context['user'],
    clientId: context['clientId'],
    practitionerClient: context['practitionerClient'],
  };
});

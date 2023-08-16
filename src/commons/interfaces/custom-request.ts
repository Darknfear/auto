import { Request } from 'express';
import { CrudRequest } from '@nestjsx/crud';

export interface ICustomRequest extends Request {
  profile?: any;
  user?: {
    email: string;
    accountId: string;
    isAdmin?: boolean;
  };
  clientId?: string;
  practitionerClient?: any;
}

export interface ICustomCrudRequest extends CrudRequest, ICustomRequest {}

import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req.headers);
  if (req.headers['authorization'] !== 'Bearer admin') {
    throw new UnauthorizedException('The token does not match');
  }

  next();
}

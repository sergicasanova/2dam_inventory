import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['password'] !== 'admin') {
      throw new BadRequestException('The token does not match');
    }

    next();
  }
}

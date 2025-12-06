import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiKeyGuard } from 'src/api-key/guards/api-key.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Injectable()
export class AuthDetectorGuard implements CanActivate {
  constructor(private apiKeyGuard: ApiKeyGuard, private jwtGuard: JwtAuthGuard) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization?.startsWith('Bearer ')) {
      return this.jwtGuard.canActivate(context);
    }

    if (request.headers['x-api-key']) {
      return this.apiKeyGuard.canActivate(context);
    }

    return false;
  }
}

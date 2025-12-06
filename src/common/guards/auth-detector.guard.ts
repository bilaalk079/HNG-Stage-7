import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ApiKeyGuard } from 'src/api-key/guards/api-key.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Injectable()
export class AuthDetectorGuard implements CanActivate {
  constructor(
    private apiKeyGuard: ApiKeyGuard,
    private jwtGuard: JwtAuthGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization?.startsWith('Bearer ')) {
      return (await this.jwtGuard.canActivate(context)) as boolean;
    }

    const apiKey = request.headers['x-api-key'] as string;
    if (apiKey) {
      return await this.apiKeyGuard.canActivate(context);
    }

    return false; 
  }
}

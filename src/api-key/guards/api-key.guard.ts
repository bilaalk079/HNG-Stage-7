import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiKeyService } from '../api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const rawKey = request.headers['x-api-key'] as string;

    if (!rawKey) throw new UnauthorizedException('No API key provided');

    const key = await this.apiKeyService.verifyApiKey(rawKey);
    if (!key) throw new UnauthorizedException('Invalid or expired API key');

    request.service = key;
    return true;
  }
}

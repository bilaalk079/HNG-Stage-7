import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ApiKeyService } from '../api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const key = request.headers['x-api-key'] as string;
    if (!key) return false;

    const validKey = await this.apiKeyService.verifyApiKey(key);
    if (!validKey) return false;

    request.service = validKey;
    return true;
  }
}

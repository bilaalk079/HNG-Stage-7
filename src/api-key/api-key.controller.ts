import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { AuthDetectorGuard } from '../common/guards/auth-detector.guard';

@Controller('keys')
export class ApiKeyController {
  constructor(private apiKeyService: ApiKeyService) {}

  @Post('create')
  @UseGuards(AuthDetectorGuard)
  async create(@Req() req: any) {
    const userId = req.user?.userId; 
    if (!userId) throw new Error('User not authenticated');

    return this.apiKeyService.createApiKey(userId);
  }
}

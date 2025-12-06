import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  NotFoundException,
  Put,
} from '@nestjs/common';
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
  @Get()
  @UseGuards(AuthDetectorGuard)
  async getAll(@Req() req) {
    const ownerId = req.user?.userId || req.service?.ownerId;
    if (!ownerId) return []; 

    const keys = await this.apiKeyService.getAllKeys(ownerId);

    return {
      status: true,
      count: keys.length,
      keys: keys.map(({ hashedKey, ...rest }) => rest), 
    };
  }

  @Put('revoke')
  @UseGuards(AuthDetectorGuard)
  async revoke(@Req() req, @Body() body: { id: string }) {
    const ownerId = req.user?.userId || req.service?.ownerId;
    if (!ownerId) throw new NotFoundException('Owner not found');

    const key = await this.apiKeyService
      .getAllKeys(ownerId)
      .then((keys) => keys.find((k) => k.id === body.id));

    if (!key) throw new NotFoundException('API key not found');

    const revoked = await this.apiKeyService.revokeKey(body.id);

    return {
      status: true,
      message: 'API key revoked successfully',
      key: {
        id: revoked.id,
        ownerId: revoked.ownerId,
        isRevoked: revoked.isRevoked,
        expiresAt: revoked.expiresAt,
        createdAt: revoked.createdAt,
      },
    };
  }
}

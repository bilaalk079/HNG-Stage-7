import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { UsersModule } from '../users/users.module';
import { AuthDetectorGuard } from 'src/common/guards/auth-detector.guard';
import { ApiKeyGuard } from './guards/api-key.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Module({
  imports: [UsersModule],
  providers: [ApiKeyService, AuthDetectorGuard, ApiKeyGuard, JwtAuthGuard],
  controllers: [ApiKeyController],
  exports: [ApiKeyService, AuthDetectorGuard, ApiKeyGuard, JwtAuthGuard],
})
export class ApiKeyModule {}

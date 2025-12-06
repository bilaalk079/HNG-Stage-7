import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthDetectorGuard } from './common/guards/auth-detector.guard';

@Controller()
export class AppController {
  @Get('protected')
  @UseGuards(AuthDetectorGuard)
  getProtected(@Req() req: any) {
    if (req.user) {
      return {
        message: 'Access granted via JWT!',
        user: req.user,
      };
    }

    if (req.service) {
      return {
        message: 'Access granted via API key!',
        serviceId: req.service.id,
      };
    }

    return { message: 'Access denied' };
  }
}

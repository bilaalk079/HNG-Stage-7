import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) body: SignUpDto) {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body(ValidationPipe) body: LogInDto) {
    return this.authService.login(body);
  }
}

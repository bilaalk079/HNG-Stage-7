import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
  ) {}

  async signup(body: SignUpDto) {
     const {email, password} = body
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists'); 
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(email, hashed);
    
    const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword };
  }

  async login(body: LogInDto) {
          const {email, password} = body
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); 
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials'); 
    }
    
    const { password: _, ...userWithoutPassword } = user;
    const token = this.jwtService.sign({ userId: user.id });
    return { user: userWithoutPassword, token };
  }
}
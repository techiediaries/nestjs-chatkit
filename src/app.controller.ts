import { Get, Post, Body, Controller} from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
import { JwtauthService } from './jwtauth.service';
import { UserService } from './user.service';
import { AppService } from './app.service';

//import { JwtPayload } from './jwt-payload.interface';
import { User } from 'user/user.entity';
//import { access } from 'fs';
//import { AuthGuard } from '@nestjs/passport';

//import Chatkit, { AuthenticationResponse } from '@pusher/chatkit-server';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService: UserService, private readonly authService: JwtauthService) {



  }

  @Get()
  root(): string {
    return this.appService.root();
  }

 
  @Post('login')
  async login(@Body() userData: User): Promise<any> {
    return this.authService.login(userData);
  }  

  @Post('register')
  async register(@Body() userData: User): Promise<any> {
    console.log(userData);    
    return this.authService.register(userData);
  }  
  @Get('users')
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }  
  

  
}

import { Get, Post, Body,Request, Controller} from '@nestjs/common';
import { JwtauthService } from './jwtauth.service';
import { AppService } from './app.service';
import { User } from 'user/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: JwtauthService) {



  }

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Post('token')
  async token(@Request() req): Promise<any> {
    console.log("got ", req.query.user_id);
    return this.authService.getToken(req.query.user_id).body;
  }

  @Post('login')
  async login(@Body() userData): Promise<any> {
    console.log("got ", userData);
    return this.authService.login(userData);
  }  

  @Post('register')
  async register(@Body() userData: User): Promise<any> {
    console.log(userData);    
    return this.authService.register(userData);
  }  
  /*@Get('users')
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }*/  
  

  
}

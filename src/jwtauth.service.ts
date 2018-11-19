import { Injectable } from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
//import { JwtPayload } from './jwt-payload.interface';
import { User } from './user/user.entity';
import Chatkit, { AuthenticationResponse } from '@pusher/chatkit-server';

@Injectable()
export class JwtauthService {
  chatkit: Chatkit;
  constructor(
    private readonly userService: UserService
    /*private readonly jwtService: JwtService,*/
  ) {
    this.chatkit = new Chatkit({
      instanceLocator: "v1:us1:8974881e-3870-47b4-9053-14dad6c0e314",
      key: "b801e52a-971d-42b5-8c60-99636dd974b9:hIpHVBedpyNkmlGtH4w3xuh/9L3t5yKVh4BfUFQF/5c="
    })    
  }

  /*async register(): void {
  }

  async login(): void {
  }

  async validateUser(payload: JwtPayload): void {
  }*/

  private getToken(userData: User): AuthenticationResponse {
    
    /*const accessToken = this.jwtService.sign(userData);
    return {
      expiresIn: 3600,
      accessToken,
    };*/
    return this.chatkit.authenticate({ userId: 'user' + userData.id });
  }  

  private async validateUser(userData: User): Promise<User> {
    
    return await this.userService.findByEmail(userData.email);
  }

  private async createUser(userData: User): Promise<User>{
    return this.userService.create(userData).then(user =>{
      return this.chatkit.createUser({id: 'user' + user.id, name: userData.name});
    });

  }

  public async login(user: User): Promise<AuthenticationResponse>{
    return this.validateUser(user).then(()=>{

      return this.getToken(user);
    });
  }
  public async register(user: User): Promise<any>{
    return this.createUser(user);
  }
}

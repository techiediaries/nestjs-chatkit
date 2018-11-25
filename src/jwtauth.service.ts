import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { User } from './user/user.entity';
import Chatkit, { AuthenticationResponse } from '@pusher/chatkit-server';

@Injectable()
export class JwtauthService {
  chatkit: Chatkit;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
    this.chatkit = new Chatkit({
      instanceLocator: "v1:us1:8974881e-3870-47b4-9053-14dad6c0e314",
      key: "b801e52a-971d-42b5-8c60-99636dd974b9:hIpHVBedpyNkmlGtH4w3xuh/9L3t5yKVh4BfUFQF/5c="
    })    
  }

  public getToken(userId: string): AuthenticationResponse {
    
    console.log('authenticating ', userId);
    return this.chatkit.authenticate({ userId: userId});
  }  

  private async validateUser(userData: User): Promise<User> {
    
    return await this.userService.findByEmail(userData.email);
  }

  private async createUser(userData: User): Promise<User>{
    return this.userService.create(userData).then(user =>{
      const userId = `${userData.name}${userData.id}`;
      const roomId = "19374915";
      const avatarURL = "https://image.flaticon.com/icons/png/128/149/149071.png";

      return this.chatkit.createUser({id: userId, 
         name: userData.name,
         avatarURL: avatarURL
      }).then(()=>{

        return this.chatkit.addUsersToRoom({ roomId: roomId,
          userIds: [userId]}).then(()=>{
            return user;
        });
        
      })

    });

  }


  public async login(user: User): Promise<any | {status: number}>{
    console.log('validate user');
    return this.validateUser(user).then((userInfo)=>{
      console.log(userInfo);
      if(!userInfo){
        return { status: 404 };
      }
      let userId = `${userInfo.name}${userInfo.id}`;
      const accessToken = this.jwtService.sign(userId);
      return {
         expires_in: 3600,
         access_token: accessToken,
         user_id: userId,
         status: 200
      };
    });
  }
  public async register(user: User): Promise<any>{
    return this.createUser(user);
  }
}

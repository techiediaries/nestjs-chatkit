import { Injectable } from '@nestjs/common';
import { User } from './user/user.entity';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private  userRepository: Repository<User>,
      ) {}

      async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({where: { 
            email: email, 
             
        }});
      }

      async create(user: User){
        return await this.userRepository.save(user);
      }
      async findAll(): Promise<User[]> {
        return await this.userRepository.find();
      }
    

}

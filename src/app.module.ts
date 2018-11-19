import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//import { JwtModule } from '@nestjs/jwt';
//import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtauthService } from './jwtauth.service';
import { UserService } from './user.service';
import { User } from './user/user.entity';

@Module({
  imports: [
   TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'my.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
   }),
   TypeOrmModule.forFeature([User]),
   //PassportModule.register({ defaultStrategy: 'jwt' }),
   /*JwtModule.register({
     secretOrPrivateKey: 'b801e52a-971d-42b5-8c60-99636dd974b9:hIpHVBedpyNkmlGtH4w3xuh/9L3t5yKVh4BfUFQF/5c=',
     signOptions: {
       expiresIn: 3600,
     },
   })*/
],
  controllers: [AppController],
  providers: [AppService, JwtauthService, UserService],
})
export class AppModule {}

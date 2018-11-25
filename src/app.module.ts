import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
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
   JwtModule.register({
     secretOrPrivateKey: 'secret123'
   })
],
  controllers: [AppController],
  providers: [AppService, JwtauthService, UserService],
})
export class AppModule {}

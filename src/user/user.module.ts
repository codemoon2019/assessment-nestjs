import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "",
      "database": "assessment-db",
      "entities": ["dist/**/**.entity{.ts,.js}"],
      "synchronize": true
  }),
  TypeOrmModule.forFeature([UserEntity]),
  AuthModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

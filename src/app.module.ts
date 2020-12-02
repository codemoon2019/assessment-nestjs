import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  
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
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

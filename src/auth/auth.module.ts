import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {expiresIn: '100s'}
      })
    })
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}

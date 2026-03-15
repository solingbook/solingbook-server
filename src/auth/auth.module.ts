import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypedConfigService } from 'src/configs/typedConfig.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [TypedConfigService],
      useFactory: (config: TypedConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

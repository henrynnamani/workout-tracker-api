import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { environmentValidator } from './config/environment.validator';
import { datasource } from './database/datasource';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './module/auth/strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './module/auth/guards/auth.guard';

@Module({
  imports: [
    AuthModule,
    UserModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
      cache: true,
      envFilePath: '.env',
      validationSchema: environmentValidator,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasource.options,
      }),
      dataSourceFactory: async () => {
        if (datasource.isInitialized) {
          return datasource;
        }

        return datasource.initialize();
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

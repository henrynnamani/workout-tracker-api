import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { environmentValidator } from './config/environment.validator';
import { datasource } from './database/datasourc';

@Module({
  imports: [
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
  providers: [AppService],
})
export class AppModule {}

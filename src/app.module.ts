import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.NEONDB_HOST,
      port: parseInt(process.env.NEONDB_PORT!),
      username: process.env.NEONDB_USER,
      password: process.env.NEONDB_PASSWORD,
      database: process.env.NEONDB_DATABASE,
      entities: [
        __dirname + '/**/entities/*{.ts,.js}',
      ],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false
      },
    }),
      ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    })],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}

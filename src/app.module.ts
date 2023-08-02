import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CommentsModule } from './comments/comments.module';
import { RoomsModule } from './rooms/rooms.module';
import { LocationModule } from './location/location.module';
import { BookRoomsModule } from './book-rooms/book-rooms.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot(
    {
      isGlobal: true
    }
  ), CommentsModule, RoomsModule, LocationModule, BookRoomsModule, FilesModule],
  controllers: [AppController, AppController],
  providers: [AppService, PrismaService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
})
export class AppModule { }

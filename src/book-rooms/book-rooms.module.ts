import { Module } from '@nestjs/common';
import { BookRoomsService } from './book-rooms.service';
import { BookRoomsController } from './book-rooms.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BookRoomsController],
  providers: [BookRoomsService, PrismaService]
})
export class BookRoomsModule {}

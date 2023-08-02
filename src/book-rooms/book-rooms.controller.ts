import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BookRoomsService } from './book-rooms.service';
import { CreateBookRoomDto } from './dto/create-book-room.dto';
import { UpdateBookRoomDto } from './dto/update-book-room.dto';
import { Public, ResponseMessage, User } from 'src/decorators/customize';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('book-rooms')
@ApiTags('book-rooms') 
export class BookRoomsController {
  constructor(private readonly bookRoomsService: BookRoomsService) {}


  @Public()
  @ResponseMessage('Lấy danh sách tất cả các phòng đã đặt')
  @Get()
  getAllBookRoom() {
    return this.bookRoomsService.getAllBookRoom();
  }

  @ResponseMessage('Đặt phòng thành công')
  @Post()
  createBookRoom(@Body() createBookRoomDto: CreateBookRoomDto, @User() user :IUser) {
    return this.bookRoomsService.createBookRoom(createBookRoomDto, user);
  }

  @Public()
  @ResponseMessage('Lấy đặt phòng theo id thành công')
  @Get(':id')
  getBookRoomById(@Param('id') id: string) {
    return this.bookRoomsService.getBookRoomById(Number(id));
  }

  @Public()
  @ResponseMessage('Cập nhật phòng theo id thành công')
  @Put(':id')
  updateBookRoom(@Param('id') id: string, @Body() updateBookRoomDto: UpdateBookRoomDto) {
    return this.bookRoomsService.updateBookRoom(Number(id), updateBookRoomDto);
  }

  @Public()
  @ResponseMessage('Xóa phòng theo id thành công')
  @Delete(':id')
  removeBookRoom(@Param('id') id: string) {
    return this.bookRoomsService.removeBookRoom(Number(id));
  }

  @Public()
  @ResponseMessage('Lấy danh sách phòng đã đặt thành công')
  @Get('lay-theo-nguoi-dung/:id')
  getAllBookedRoomById(@Param('id') id: string) {
    return this.bookRoomsService.getAllBookedRoomById(Number(id));
  }
}

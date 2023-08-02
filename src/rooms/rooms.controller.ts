import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Public, ResponseMessage, User } from 'src/decorators/customize';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('rooms')
@ApiTags('rooms') 
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}


  @Public()
  @ResponseMessage('Lấy danh sách phòng thành công')
  @Get()
  getAllRooms() {
    return this.roomsService.getAllRooms();
  }

  @Public()
  @ResponseMessage('Tạo phòng thành công')
  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto, @User() user: IUser) {
    return this.roomsService.createRoom(createRoomDto, user);
  }

  @Public()
  @Get('lay-phong-theo-vi-tri/:id')
  @ResponseMessage('Lấy danh sách phòng theo vị trí thành công')
  getRoomBylocation(@Param('id') id:string) {
    return this.roomsService.getRoomBylocation(Number(id))
  }

  @Public()
  @ResponseMessage('Phân trang tìm kiếm thành công')
  @Get('phan-trang-tim-kiem')
  getRoomByPaginate(@Query('pageIndex') pageIndex: string, @Query('pageSize') pageSize: string ) {
    return this.roomsService.getRoomByPaginate(Number(pageIndex), Number(pageSize))
  }


  @Public()
  @ResponseMessage('Lấy thông tin phòng thành công')
  @Get(':id')
  getRoomById(@Param('id') id:string) {
    return this.roomsService.getRoomById(Number(id))
  }


  @Public()
  @ResponseMessage('Cập nhật phòng thành công')
  @Put(':id')
  updateRoomById(@Param('id') id:string, @Body() updateRoom: UpdateRoomDto) {
    return this.roomsService.updateRoomById(Number(id), updateRoom)
  }

  @Public()
  @ResponseMessage('Xóa phòng thành công')
  @Delete(':id')
  deleteRoomById(@Param('id') id:string) {
    return this.roomsService.deleteRoomById(Number(id))
  }

}

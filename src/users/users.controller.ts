import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage } from 'src/decorators/customize';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users') 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @ResponseMessage("Lấy danh sách người dùng thành công")
  @Get()
  getAllUser() {
    return this.usersService.getAllUser();
  }

  
  @Public()
  @ResponseMessage("Tạo người dùng thành công")
  @Post('')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }



  @Public()
  @ResponseMessage("Xóa người dùng thành công")
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(Number(id));
  }

  @Public()
  @ResponseMessage('Lấy danh sách phân trang thành công')
  @Get('phan-trang-tim-kiem')
  paginationUser(@Query('pageIndex') pageIndex: string, @Query('pageSize') pageSize: string) {
    return this.usersService.paginationUser(Number(pageIndex), Number(pageSize))
  }

  @Public()
  @ResponseMessage('Lấy thông tin người dùng thành công')
  @Get(':id')
  getUserInfoById(@Param('id') id: string) {
    return this.usersService.getUserInfoByid(Number(id))
  }


  @Public()
  @ResponseMessage('Cập nhật người dùng thành công')
  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() userUpdate: UpdateUserDto) {
    return this.usersService.updateUserById(Number(id), userUpdate)
  }

  @Public()
  @ResponseMessage('Tìm kiếm người dùng thành công')
  @Get('search/:keyword')
  searchUserByName(@Param('keyword') keyword: string) {
    return this.usersService.searchUserByName(keyword)
  }

  @ResponseMessage('Upload avatar thành công')
  @Post('upload-avatar')
  UploadAvatarUser() {
    return this.usersService.UploadAvatarUser()
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Public, ResponseMessage } from 'src/decorators/customize';
import { ApiTags } from '@nestjs/swagger';

@Controller('location')
@ApiTags('location') 
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Public()
  @ResponseMessage('Lấy trí thành công')
  @Get()
  getAllLocation() {
    return this.locationService.getAllLocation();
  }

  @Public()
  @ResponseMessage('Tạo vị trí thành công')
  @Post()
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto);
  }

  @Public()
  @ResponseMessage('Lấy danh sách phân trang thành công')
  @Get('phan-trang-tim-kiem')
  getRoomByPaginate(@Query('pageIndex') pageIndex: string, @Query('pageSize') pageSize: string) {
    return this.locationService.paginationLocation(Number(pageIndex), Number(pageSize))
  }


  @Public()
  @ResponseMessage('Lấy thông tin Vị trí thành công')
  @Get(':id')
  getLocationById(@Param('id') id:string) {
    return this.locationService.getLocationById(Number(id))
  }


  @Public()
  @ResponseMessage('Cập nhật phòng thành công')
  @Put(':id')
  updateLocationById(@Param('id') id:string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.updateLocationById(Number(id), updateLocationDto)
  }

  @Public()
  @ResponseMessage('Xóa phòng thành công')
  @Delete(':id')
  deleteLocationById(@Param('id') id:string) {
    return this.locationService.deleteLocationById(Number(id))
  }
}

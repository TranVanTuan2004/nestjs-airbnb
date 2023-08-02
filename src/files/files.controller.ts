import { IUser } from './../users/users.interface';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiFile, Public, ResponseMessage, User } from 'src/decorators/customize';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @ApiHeader({
    name: 'folder_type', // The header name
    description: 'Type of the folder', // Description of the header
    required: true, // Set this to false if the header is optional
  })
  @ApiConsumes('multipart/form-data')
  @ApiFile('upload-avatar')
  @ResponseMessage('Upload avatar thành công')
  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('upload-avatar'))
  uploadAvatar(@UploadedFile(new ParseFilePipeBuilder()
    .addMaxSizeValidator({
      maxSize: 1024 * 1024
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),) file: Express.Multer.File, @User() user :IUser) {
    return this.filesService.uploadAvatar(file.filename, user);
  }

  @Public()
  @ApiHeader({
    name: 'folder_type', // The header name
    description: 'Type of the folder', // Description of the header
    required: true, // Set this to false if the header is optional
  })
  @ApiConsumes('multipart/form-data')
  @ApiFile('upload-anh-phong')
  @ResponseMessage('Upload ảnh phòng thành công')
  @Post('upload-anh-phong/:maPhong')
  @UseInterceptors(FileInterceptor('upload-anh-phong'))
  uploadRoomPhoto(@Param('maPhong') maPhong: string, @UploadedFile(new ParseFilePipeBuilder()
    .addMaxSizeValidator({
      maxSize: 1024 * 1024
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),) file: Express.Multer.File) {
    return this.filesService.uploadRoomPhoto(Number(maPhong), file.filename);
  }


  @Public()
  @ApiHeader({
    name: 'folder_type', // The header name
    description: 'Type of the folder', // Description of the header
    required: true, // Set this to false if the header is optional
  })
  @ApiConsumes('multipart/form-data')
  @ApiFile('upload-hinh-vitri')
  @ResponseMessage('Upload hình vị trí thành công')
  @Post('upload-anh-viTri/:maViTri')
  @UseInterceptors(FileInterceptor('upload-hinh-vitri'))
  uploadLocationPhoto(@Param('maViTri') maViTri: string, @UploadedFile(new ParseFilePipeBuilder()
    .addMaxSizeValidator({
      maxSize: 1024 * 1024
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),) file: Express.Multer.File) {
    return this.filesService.uploadLocationPhoto(Number(maViTri), file.filename);
  }
}

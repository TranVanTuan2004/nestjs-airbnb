import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public, ResponseMessage, User } from 'src/decorators/customize';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('binh-luan')
@ApiTags('binh-luan') 
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Public()
  @ResponseMessage('Danh sách bình luận')
  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ResponseMessage('Post comment thành công')
  @Post()
  createComment(@Body() comment: CreateCommentDto, @User() user: IUser) {
    return this.commentsService.createComment(comment, user);
  }

  @ResponseMessage('Chỉnh sửa comment thành công')
  @Put(':id')
  updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @User() user: IUser) {
    return this.commentsService.updateComment(Number(id), updateCommentDto);
  }


  @ResponseMessage('Xóa comment thành công')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.removeComment(Number(id));
  }


  @Public()
  @ResponseMessage('Lấy thành công danh sách comment theo phòng')
  @Get('lay-binh-luan-theo-phong/:id') 
  getCommentByRoom(@Param('id') idPhong: string) {
    return this.commentsService.getCommentByRoom(Number(idPhong))
  }
}

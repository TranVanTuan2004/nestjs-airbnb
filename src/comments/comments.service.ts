import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) { }

  async checkCommentExists(id: number) {
    const existingComments = await this.prisma.binhLuan.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingComments) {
      throw new NotFoundException('Không tìm thấy bình luận');
    }

    return existingComments;
  }

  async getAllComments() {
    return await this.prisma.binhLuan.findMany({
      where: {
        isDeleted: false
      }
    });
  }

  async createComment(createComment: CreateCommentDto, user: IUser) {
    let comment = {
      ma_phong: createComment.maPhong,
      ma_nguoi_binh_luan: user.id,
      sao_binh_luan: createComment.saoBinhLuan,
      noi_dung: createComment.noiDung,
      isDeleted: false
    }
    let resData = await this.prisma.binhLuan.create({ data: comment });
    return {
      maNguoiBinhLuan: resData?.ma_nguoi_binh_luan,
    }
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    await this.checkCommentExists(id)
    let newComment = await this.prisma.binhLuan.update({
      where: {
        id: id
      },
      data: {
        sao_binh_luan: updateCommentDto.saoBinhLuan,
        noi_dung: updateCommentDto.noiDung,
      }
    })

    return {
      maNguoiThayDoi: newComment?.ma_nguoi_binh_luan,
      noiDungThayDoi: newComment?.noi_dung
    }
  }

  async removeComment(id: number) {
    await this.checkCommentExists(id)
    let deleteComment = await this.prisma.binhLuan.update({
      where: {
        id: id
      },
      data: {
        isDeleted: false
      }
    });
    return {
      id: deleteComment.id
    }
  }

  async getCommentByRoom(idPhong: number) {
    let commentList = await this.prisma.binhLuan.findMany({
      where: {
        ma_phong: idPhong,
        isDeleted: false
      }
    })
    return commentList
  }
}

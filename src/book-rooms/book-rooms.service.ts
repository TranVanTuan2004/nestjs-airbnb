import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBookRoomDto } from './dto/update-book-room.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateBookRoomDto } from './dto/create-book-room.dto';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class BookRoomsService {
  constructor(private prisma: PrismaService) {}

  async checkBookRoomExists(id: number) {
    const existingBookRoom = await this.prisma.datPhong.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingBookRoom) {
      throw new NotFoundException('Không tìm thấy phòng đặt');
    }

    return existingBookRoom;
  }


  async getAllBookRoom() {
    return await this.prisma.datPhong.findMany({
      where: {
        isDeleted: false
      }
    });
  }

  async createBookRoom(createBookRoomDto: CreateBookRoomDto, user :IUser) {
    let newRoom = await this.prisma.datPhong.create({
      data: {
        ...createBookRoomDto,
        ma_nguoi_dat: user.id,
        isDeleted: false
      }
    })
    return {
      maPhong: newRoom.ma_phong,
      maNguoiDat: newRoom.ma_nguoi_dat
    }
  }

  async getBookRoomById(id: number) {
    await this.checkBookRoomExists(id)
    return await this.prisma.datPhong.findFirst({
      where: {
        id,
        isDeleted: false
      }
    });
  }

  async updateBookRoom(id: number, updateBookRoomDto: UpdateBookRoomDto) {
    await this.checkBookRoomExists(id)
    let bookRoom = await this.prisma.datPhong.update({
      where: {
        id: id,
        isDeleted: false
      },
      data: updateBookRoomDto
    });
    return {
      id: bookRoom?.id,
    }
  }

  async removeBookRoom(id: number) {
    await this.checkBookRoomExists(id)
    let deleteRoom = await this.prisma.datPhong.update({
      where: {
        id,
        isDeleted: false
      },
      data: {
        isDeleted: true
      }
    });
    return {
      id: deleteRoom?.id
    }
  }

  async getAllBookedRoomById(id :number) {
    let exits = await this.prisma.datPhong.findFirst({
      where: {
        ma_nguoi_dat: id,
        isDeleted: false
      }
    })
    if(!exits) throw new NotFoundException('không tìm thấy user')
    let listBookedRoom = await this.prisma.datPhong.findMany({
      where: {
        ma_nguoi_dat: id,
        isDeleted: false
      }
    })
    return listBookedRoom
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class RoomsService {

  constructor(private prisma: PrismaService) { }

  async checkRoomExists(id: number) {
    const existingRoom = await this.prisma.phong.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingRoom) {
      throw new NotFoundException('Không tìm thấy phòng');
    }

    return existingRoom;
  }

  async getAllRooms() {
    return await this.prisma.phong.findMany({
      where: {
        isDeleted: false
      }
    });
  }

  async createRoom(createRoomDto: CreateRoomDto, user: IUser) {
    let room = await this.prisma.phong.create({
      data: {
        ...createRoomDto,
        nguoi_tao: user.id,
        isDeleted: false
      }
    })
    return {
      name: room?.ten_phong,
      nguoiTao: user?.email
    }
  }

  async getRoomBylocation(id: number) {
    await this.checkRoomExists(id);
    let rooms = await this.prisma.phong.findMany({
      where: {
        vi_tri: id,
        isDeleted: false
      }
    })
    return rooms
  }

  async getRoomByPaginate(pageIndex: number, pageSize:number) {
    const skip = (pageIndex - 1) * pageSize;
    const itemRooms = pageSize;
    let rooms = await this.prisma.phong.findMany({
      where: {
        isDeleted: false
      },
      skip,
      take: itemRooms,
    })
    // Lấy tổng số bản ghi trong bảng User
    const totalRooms = await this.prisma.phong.count({
      where: {
        isDeleted: false
      }
    });
    return {
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalItem: totalRooms,
      rooms: rooms
    }
  }

  async getRoomById(id: number) {
    await this.checkRoomExists(id);
    let roomInfo = await this.prisma.phong.findFirst({
      where: {
        id,
        isDeleted: false
      }
    })
    return roomInfo
  }


  async updateRoomById(id: number, updateRoom: UpdateRoomDto) {
    await this.checkRoomExists(id);
    let room = await this.prisma.phong.update({
      where: {
        id,
        isDeleted: false
      },
      data: {
        ...updateRoom,
      }
    })
    return room
  }

  async deleteRoomById(id: number) {
    await this.checkRoomExists(id);
    let deleteRoom = await this.prisma.phong.update({
      where: {
        id,
        isDeleted: false
      },
      data: {
        isDeleted: true
      }
    })
    return {
      id: deleteRoom.id
    }
  }

}

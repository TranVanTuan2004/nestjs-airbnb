import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { compareSync, hashSync } from 'bcrypt'
import { IUser } from './users.interface';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  getHassPassword(pass_word: string) {
    const saltOrRounds = 10;
    const hash = hashSync(pass_word, saltOrRounds);
    return hash
  }

  isValidPassword(password: string, hassPassword: string) {
    return compareSync(password, hassPassword)
  }

  async findUserByEmail(username: string) {
    let user = await this.prisma.nguoiDung.findFirst({
      where: {
        email: username
      }
    })
    return user
  }

  async registerUser(userInfo: RegisterUserDto) {
    let isExist = await this.prisma.nguoiDung.findFirst({
      where: {
        email: userInfo.email
      }
    })
    if (isExist) throw new BadRequestException(`${isExist.email} đã tồn tại`)
    let hassPassword = await this.getHassPassword(userInfo.pass_word)
    let newUser = await this.prisma.nguoiDung.create({
      data: {
        ...userInfo,
        pass_word: hassPassword,
        isDeleted: false,
        role: 'USER'
      }
    })
    return {
      id: newUser?.id,
      email: newUser?.email
    }
  }


  async createUser(createUserDto: CreateUserDto) {
    let isExist = await this.prisma.nguoiDung.findFirst({
      where: {
        email: createUserDto.email
      }
    })
    if (isExist) throw new BadRequestException(`${isExist.email} đã tồn tại`)
    let hassPassword = await this.getHassPassword(createUserDto.pass_word)
    let newUser = await this.prisma.nguoiDung.create({
      data: {
        ...createUserDto,
        pass_word: hassPassword,
        isDeleted: false
      }
    });
    return {
      id: newUser?.id,
      email: newUser?.email
    }
  }

  getAllUser() {
    return this.prisma.nguoiDung.findMany({
      where: {
        isDeleted: false
      }
    });
  }

  async removeUser(id: number) {
    let isExist = await this.prisma.nguoiDung.findFirst({
      where: {
        id,
      }
    })
    if(isExist.isDeleted === true) throw new BadRequestException('Xóa thất bại')
    await this.prisma.nguoiDung.update({
      where: {
        id
      },
      data: {
        isDeleted: true
      }
    });
    return null
  }

  async paginationUser(pageIndex: number, pageSize: number) {
    const skip = (pageIndex - 1) * pageSize;
    const itemUser = pageSize;
    let users = await this.prisma.nguoiDung.findMany({
      where: {
        isDeleted: false
      },
      skip, 
      take: itemUser,
    })

     // Lấy tổng số bản ghi trong bảng User
     const totalUsers = await this.prisma.nguoiDung.count({
      where: {
        isDeleted: false
      }
    });

     return {
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalItem: totalUsers,
        users: users
     }
  }

  async getUserInfoByid(id: number) {
    let userInfo = await this.prisma.nguoiDung.findFirst({
      where: {
        id,
        isDeleted: false
      }
    })
    if(!userInfo) throw new BadRequestException('Người dùng không tồn tại!')

    return userInfo
  }

  async updateUserById(id: number, userUpdate: UpdateUserDto) {
    let isExist = await this.prisma.nguoiDung.findFirst({
      where: {
        email: userUpdate.email
      }
    })
    if (isExist) throw new BadRequestException(`${isExist.email} đã tồn tại`)
    let {pass_word, ...user} = userUpdate
    let userInfo = await this.prisma.nguoiDung.findFirst({
      where: {
        id,
        isDeleted: false
      }
    })
    if(!userInfo) throw new BadRequestException('Người dùng không tồn tại!')
    await this.prisma.nguoiDung.update({
      where: {
        id
      },
      data: user
    })
  }

  async searchUserByName(keyword: string) {
    let users = await this.prisma.nguoiDung.findMany({
      where: {
        isDeleted: false,
        OR: [
          {
            name: {
              contains: keyword, // Tìm kiếm theo tên
            },
          },
          {
            email: {
              contains: keyword, // Tìm kiếm theo email
            },
          },
        ],
      }
    })
    return users
  }

  UploadAvatarUser() {
    
  }
}

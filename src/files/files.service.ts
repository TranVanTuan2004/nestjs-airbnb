import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class FilesService {

  constructor(private readonly prisma: PrismaService) {}


  async uploadAvatar(file : string, user :IUser) {
     let infoUser = await this.prisma.nguoiDung.update({
      where: {
        id: user.id
      },
      data: {
        hinh_anh: file
      }
    });
    return {
      hinhAnh: infoUser.hinh_anh
    }
  }

  async uploadRoomPhoto(maPhong:number, file : string) {
    let infoRoom = await this.prisma.phong.update({
     where: {
       id: maPhong
     },
     data: {
       hinh_anh: file
     }
   });
   return {
     hinhAnh: infoRoom.hinh_anh
   }
 }


 async uploadLocationPhoto(maViTri:number, file : string) {
  let infoLocation = await this.prisma.viTri.update({
   where: {
     id: maViTri
   },
   data: {
     hinh_anh: file
   }
 });
 return {
   hinhAnh: infoLocation.hinh_anh
 }
}

}

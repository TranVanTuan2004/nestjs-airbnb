import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async checkLocationExists(id: number) {
    const existinglocation = await this.prisma.viTri.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existinglocation) {
      throw new NotFoundException('Không tìm thấy vị trí');
    }

    return existinglocation;
  }

  getAllLocation() {
    return this.prisma.viTri.findMany({
      where: {
        isDeleted: false
      }
    });
  }

  async createLocation(createLocationDto :CreateLocationDto) {
    let createLocation = await this.prisma.viTri.create({
      data: {
        ...createLocationDto,
        isDeleted: false
      }
    })
    return {
      id: createLocation.id
    }
  }

  async paginationLocation(pageIndex: number, pageSize: number) {
    const skip = (pageIndex - 1) * pageSize;
    const itemLocation = pageSize;
    let locations = await this.prisma.viTri.findMany({
      where: {
        isDeleted: false
      },
      skip, 
      take: itemLocation,
    })

     // Lấy tổng số bản ghi trong bảng User
     const totalLocations = await this.prisma.viTri.count({
      where: {
        isDeleted: false
      }
    });

     return {
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalItem: totalLocations,
        locations: locations
     }
  }

  async getLocationById(id: number) {
    await this.checkLocationExists(id);
    let locationInfo = await this.prisma.viTri.findFirst({
      where: {
        id,
        isDeleted: false
      }
    })
    return locationInfo
  }


  async updateLocationById(id: number, updateLocationDto: UpdateLocationDto) {
    await this.checkLocationExists(id);
    let location = await this.prisma.viTri.update({
      where: {
        id: id,
        isDeleted: false
      },
      data: {
        ...updateLocationDto
      }
    })
    return location
  }

  async deleteLocationById(id :number) {
    await this.checkLocationExists(id);
    let deleteLocation = await this.prisma.viTri.update({
      where: {
        id,
        isDeleted: false
      },
      data: {
        isDeleted: true
      }
    })
    return {
      id: deleteLocation.id
    }
  }
}

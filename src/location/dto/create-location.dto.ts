import { IsNotEmpty } from "class-validator";

export class CreateLocationDto {
    @IsNotEmpty({message: 'ten_vi_tri không được để trống'})
    ten_vi_tri: string

    @IsNotEmpty({message: 'tinh_thanh không được để trống'})
    tinh_thanh: string

    @IsNotEmpty({message: 'quoc_gia không được để trống'})
    quoc_gia: number

    @IsNotEmpty({message: 'hinh_anh không được để trống'})
    hinh_anh: string
}

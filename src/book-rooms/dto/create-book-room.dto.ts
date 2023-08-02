import { IsNotEmpty } from "class-validator";

export class CreateBookRoomDto {
    @IsNotEmpty({message: "ma_phong không được để trống"})
    ma_phong: number

    @IsNotEmpty({message: "ngay_den không được để trống"})
    ngay_den: Date

    @IsNotEmpty({message: "ngay_di không được để trống"})
    ngay_di: Date

    @IsNotEmpty({message: "so_luong_khach không được để trống"})
    so_luong_khach: number
}

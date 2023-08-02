import { IsNotEmpty } from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty({message: 'ten_phong không được để trống'})
    ten_phong: string;
    
    @IsNotEmpty({message: 'khach không được để trống'})
    khach: number;

    @IsNotEmpty({message: 'phong_ngu không được để trống'})
    phong_ngu: number;

    @IsNotEmpty({message: 'giuong không được để trống'})
    giuong: number;

    @IsNotEmpty({message: 'phong_tam không được để trống'})
    phong_tam: number;

    @IsNotEmpty({message: 'mo_ta không được để trống'})
    mo_ta: string;

    @IsNotEmpty({message: 'gia_tien không được để trống'})
    gia_tien: number;

    @IsNotEmpty({message: 'may_giat không được để trống'})
    may_giat: boolean;

    @IsNotEmpty({message: 'ban_la không được để trống'})
    ban_la: boolean;

    @IsNotEmpty({message: 'tivi không được để trống'})
    tivi: boolean;

    @IsNotEmpty({message: 'dieu_hoa không được để trống'})
    dieu_hoa: boolean;

    @IsNotEmpty({message: 'wifi không được để trống'})
    wifi: boolean;

    @IsNotEmpty({message: 'bep không được để trống'})
    bep: boolean;

    @IsNotEmpty({message: 'do_xe không được để trống'})
    do_xe: boolean;

    @IsNotEmpty({message: 'ho_boi không được để trống'})
    ho_boi: boolean;

    @IsNotEmpty({message: 'ban_ui không được để trống'})
    ban_ui: boolean;

    @IsNotEmpty({message: 'hinh_anh không được để trống'})
    hinh_anh: string;

    @IsNotEmpty({message: 'vi_tri không được để trống'})
    vi_tri: number;
}

import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty({message: 'maPhong không được để trống'})
    maPhong: number;
    
    @IsNotEmpty({message: 'saoBinhLuan không được để trống'})
    saoBinhLuan: number;
    
    @IsNotEmpty({message: 'noiDung không được để trống'})
    noiDung: string;
}

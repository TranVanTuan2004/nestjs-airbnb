import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty({ message: 'name không được để trống' })
    name: string;

    @IsNotEmpty({ message: 'email không được để trống' })
    @IsEmail({}, { message: 'email không hợp lệ' })
    email: string;

    @IsNotEmpty({ message: 'pass_word không được để trống' })
    pass_word: string;

    @IsNotEmpty({ message: 'phone không được để trống' })
    phone: string;

    @IsNotEmpty({ message: 'bith_day không được để trống' })
    birth_day: string;

    @IsNotEmpty({ message: 'gender không được để trống' })
    gender: string;
}

export class CreateUserDto {
    @IsNotEmpty({ message: 'name không được để trống' })
    name: string;

    @IsNotEmpty({ message: 'email không được để trống' })
    @IsEmail({}, { message: 'email không hợp lệ' })
    email: string;

    @IsNotEmpty({ message: 'pass_word không được để trống' })
    pass_word: string;

    @IsNotEmpty({ message: 'phone không được để trống' })
    phone: string;

    @IsNotEmpty({ message: 'birth_day không được để trống' })
    birth_day: string;

    @IsNotEmpty({ message: 'gender không được để trống' })
    gender: string;

    @IsNotEmpty({ message: 'role không được để trống' })
    role: string;
}


export class UserLoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'string', description: 'email' })
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'string',
        description: 'pass_word',
    })
    readonly pass_word: string;
}
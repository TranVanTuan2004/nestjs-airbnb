import { RegisterUserDto, UserLoginDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, UseGuards, Request, Get} from '@nestjs/common';
import { Public, ResponseMessage } from 'src/decorators/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth') 
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Public()
    @ResponseMessage('Đăng nhập tài khoản thành công')
    @ApiBody({ type: UserLoginDto })
    @Post('login')
    login(@Request() req) {
        console.log(req.user)
        return this.authService.handleLogin(req.user)
    }


    @Public()
    @ResponseMessage('Đăng ký tài khoản thành công')
    @Post('register')
    handleRegister(@Body() userInfo: RegisterUserDto) {
        return this.authService.handleregister(userInfo)
    }


    @UseGuards(JwtAuthGuard)
    @ResponseMessage('Lấy thông tin người dùng thành công')
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}

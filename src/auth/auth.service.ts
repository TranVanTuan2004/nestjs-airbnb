import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      ) {}

      async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(username);
        if (user) {
            const isValid = this.usersService.isValidPassword(pass, user.pass_word)
            if (isValid) {
                return user
            }
        }
        return null;
    }

    async handleLogin(user: IUser) {
      const {id, email, name, phone, birth_day, gender, role} = user;
      const payload = {
        id,
        name,
        email,
        phone,
        birth_day,
        gender,
        role
    };
      return {
        user: payload,
        access_token: this.jwtService.sign(payload),
      };
    }


    handleregister(userInfo: RegisterUserDto) {
      return this.usersService.registerUser(userInfo)
    }
}

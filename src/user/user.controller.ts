import {  Post, Body, Controller, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRO } from './user.payload';
import { CreateUserDto, LoginUserDto } from './dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @ApiOperation({description: "Signup Operation"})
  @ApiBody({type: CreateUserDto })
  @ApiOkResponse({ status: 200, description: 'Returns the new user info with token', type: UserRO})
  @Post('users')
  async create(@Body('user') userData: CreateUserDto): Promise<UserRO> {
    return await this.userService.create(userData);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({description: "Login Operation"})
  @ApiBody({ description: "The Description for Login", type: LoginUserDto })
  @ApiOkResponse({ status: 200, description: 'Returns logged in user info with token', type: UserRO})
  @Post('users/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    return await this.userService.login(loginUserDto);
  }
}

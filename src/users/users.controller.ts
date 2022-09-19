import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@ApiTags('Users')
@Controller('/users')
export class UsersController {

  constructor(private usersService: UsersService) {
  }
  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto){
    return this.usersService.createUser(userDto)
  }
  @ApiOperation({summary: 'Получение списка пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll(){
    return this.usersService.getAllUsers()
  }
  @ApiOperation({summary: 'Выдача роли пользователю'})
  @ApiResponse({status: 200})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  AddRole(@Body() dto: AddRoleDto){
    return this.usersService.addRole(dto)

}
  @ApiOperation({summary: 'Выдача бана пользователю'})
  @ApiResponse({status: 200})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  banUser(@Body() dto: BanUserDto){
    return this.usersService.banUser(dto)

  }
}

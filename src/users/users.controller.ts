import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.model";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/addRoleDto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private userService:UsersService) {}
  @ApiOperation({summary:"For create user!"})
  @ApiResponse({status:200,type:User})
  @Post()
  create(@Body() userDto:CreateUserDto){
    return this.userService.createUser(userDto)
  }
  @ApiOperation({summary:"To see all users!"})
  @ApiResponse({status:200,type:[User]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll(){
    return this.userService.getAllUsers()
  }
  @ApiOperation({summary:"Take a role"})
  @ApiResponse({status:200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto:AddRoleDto){
    return this.userService.addRole(dto)
  }
  @ApiOperation({summary:"Ban user"})
  @ApiResponse({status:200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto:BanUserDto){
    return this.userService.ban(dto)
  }
}
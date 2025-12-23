import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  Param,
  //UsePipes,
  //ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  // method specified validation @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  GetAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserByID(@Param('id') id: string) {
    //the followimg check sjould be done in a middlewear.. but to keep it simple it will be done here for now
    const idValid = mongoose.Types.ObjectId.isValid(id);
    if (!idValid) throw new HttpException('Invalid user ID (╬▔皿▔)╯', 400);
    const user = await this.usersService.getUserById(id);
    return user;
  }
}

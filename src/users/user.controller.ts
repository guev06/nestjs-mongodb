import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  Param,
  Patch,
  UsePipes,
  //UsePipes,
  //ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';
import { updateUserDto } from './dto/updateUser.dto';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  // method specified validation
  @UsePipes(new ValidationPipe())
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

  @Patch(':id') //updates parts of the resource while put updates it all
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: updateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
      throw new HttpException(
        'cannot edit due to invalid user ID (╬▔皿▔)╯',
        400,
      );
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updatedUser) throw new HttpException('User not found (╬▔皿▔)╯', 404);
    return updatedUser;
  }
}

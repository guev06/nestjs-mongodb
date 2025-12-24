import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUserSettings.dto';
import { UserSettings } from 'src/schemas/userSettings.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...CreateUserDto }: CreateUserDto) {
    if (settings) {
      const userSettings = new this.userSettingsModel(settings);
      const savedNewSettings = await userSettings.save();
      const newUser = new this.userModel({
        ...CreateUserDto,
        settings: savedNewSettings._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(CreateUserDto);
    return newUser.save();
    //data transfer object
  }

  getAllUsers() {
    return this.userModel.find().populate('settings');
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate('settings'); //if settings had a nested obh: ('settings.object');
  }

  updateUser(id: string, updateUserDto: any) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegistrationDto } from '../auth/dto/registration.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(registrationDto: RegistrationDto) {
    const createdUser = new this.userModel(registrationDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find({});
  }

  findOne(id: string) {
    return this.userModel.findOne({ id });
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ id }, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.findOneAndDelete({ id });
  }
}

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

  save(user: User) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find({}).populate('companiesOwned');
  }

  findOne(id: string) {
    return this.userModel.findOne({ _id: id }).populate('companiesOwned');
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  updatePure(id: string, user: User) {
    const filter = { _id: id };
    return this.userModel.updateOne(filter, user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.findOneAndDelete({ _id: id });
  }
}

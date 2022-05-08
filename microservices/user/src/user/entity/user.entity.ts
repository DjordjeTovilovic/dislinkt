import { Node } from 'neo4j-driver';
import { UserDto } from '../dto/user.dto';
import { Education } from './education.entity';
import { Experiences } from './experiences.entity';
import { Interests } from './interests.entity';
import { Skills } from './skills.entity';

export class User {
  constructor(private readonly node: Node) {}

  experiences: Experiences;
  education: Education;
  skills: Skills;
  interests: Interests;

  toJson(): UserDto {
    const {
      id,
      username,
      email,
      bio,
      image,
      password,
      gender,
      phoneNumber,
      birthday,
      privateProfile,
    } = this.node.properties;

    return {
      id,
      username,
      email,
      image,
      bio,
      password,
      gender,
      phoneNumber,
      birthday,
      privateProfile,
      experiences: this.experiences?.toJson(),
      education: this.education?.toJson(),
      skills: this.skills?.toJson(),
      interests: this.interests?.toJson(),
    };
  }
}

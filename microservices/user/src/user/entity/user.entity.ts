import { Node } from 'neo4j-driver';
import { UserDto } from '../dto/user.dto';

export class User {
  constructor(private readonly node: Node) {}

  toJson(): UserDto {
    const { id, username, email, bio, image, password } = this.node.properties;

    return {
      id,
      username,
      email,
      image,
      bio,
      password,
    };
  }
}

import { Node } from 'neo4j-driver';
import { UserDto } from '../../protos/user.pb';

export class User {
  constructor(private readonly node: Node) {}

  getId(): string {
    return (<Record<string, any>>this.node.properties).id;
  }

  getPassword(): string {
    return (<Record<string, any>>this.node.properties).password;
  }

  toJson(): UserDto {
    const { id, username, email, bio, image } = this.node.properties;

    return {
      id,
      username,
      email,
      image,
      bio,
    };
  }
}

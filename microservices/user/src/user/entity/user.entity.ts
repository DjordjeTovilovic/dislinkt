import { Node } from 'neo4j-driver';
import { UserDto } from '../dto/user.dto';

export class User {
  constructor(private readonly node: Node) {}

  getId(): string {
    return (<Record<string, any>>this.node.properties).id;
  }

  getPassword(): string {
    return (<Record<string, any>>this.node.properties).password;
  }

  getClaims() {
    const { username, email, bio, image } = <Record<string, any>>(
      this.node.properties
    );

    return {
      sub: username,
      username,
      email,
      bio,
      image: image || 'https://picsum.photos/200',
    };
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

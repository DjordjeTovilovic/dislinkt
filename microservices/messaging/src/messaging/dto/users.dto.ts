import { FindAllRequest } from '../../protos/messaging.pb';

export class UsersDto implements FindAllRequest {
  user1Id: string;
  user2Id: string;
}

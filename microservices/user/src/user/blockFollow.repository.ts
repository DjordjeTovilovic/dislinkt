import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersDto } from './dto/users.dto';
import { User } from './entity/user.entity';

@Injectable()
export class BlockFollowRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

  async follow(usernameToFollow, username) {
    const res = await this.neo4jService.write(
      `
      MATCH (userToFollow:User {username: $usernameToFollow})
      MATCH (loggedInUser:User {username: $username})

      FOREACH (_ in case userToFollow.privateProfile when true then [1] else [] end |
        MERGE (loggedInUser)-[rtf:REQUESTS_TO_FOLLOW]->(userToFollow) )
      FOREACH (_ in case userToFollow.privateProfile when false then [1] else [] end |
          MERGE (loggedInUser)-[f:FOLLOWS]->(userToFollow) )

      RETURN userToFollow
      `,
      {
        usernameToFollow,
        username,
      },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    return new User(row.get('userToFollow')).toJson();
  }

  async unfollow(usernameToUnfollow, username) {
    const res = await this.neo4jService.write(
      `
      
      MATCH (loggedInUser:User {username: $username})-[f:FOLLOWS]-
      (userToUnfollow:User {username: $usernameToUnfollow})

      DELETE f

      RETURN userToUnfollow
      `,
      {
        usernameToUnfollow,
        username,
      },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    return new User(row.get('userToUnfollow')).toJson();
  }

  async approveFollowRequest(usernameToApprove, username) {
    const res = await this.neo4jService.write(
      `
      
      MATCH (loggedInUser:User {username: $username})<-[rtf:REQUESTS_TO_FOLLOW]-
      (userToApprove:User {username: $usernameToApprove})

      DELETE rtf

      MERGE (loggedInUser)<-[f:FOLLOWS]-(userToApprove)

      RETURN userToApprove
      `,
      {
        usernameToApprove,
        username,
      },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    return new User(row.get('userToApprove')).toJson();
  }

  async declineFollowRequest(usernameToDecline, username) {
    const res = await this.neo4jService.write(
      `
      
      MATCH (loggedInUser:User {username: $username})<-[rtf:REQUESTS_TO_FOLLOW]-
      (userToDecline:User {username: $usernameToDecline})

      DELETE rtf

      RETURN userToDecline
      `,
      {
        usernameToDecline,
        username,
      },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    return new User(row.get('userToDecline')).toJson();
  }

  async deleteFollowRequest(usernameToDelete, username) {
    const res = await this.neo4jService.write(
      `
      
      MATCH (loggedInUser:User {username: $username})-[rtf:REQUESTS_TO_FOLLOW]->
      (userToDelete:User {username: $usernameToDelete})

      DELETE rtf

      RETURN userToDelete
      `,
      {
        usernameToDelete,
        username,
      },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    return new User(row.get('userToDelete')).toJson();
  }

  async allFollowing(username) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {username: $username}) - [f:FOLLOWS] -> (followedUser:User)
          RETURN followedUser
      `,
      {
        username,
      },
    );
    let users = [];
    res.records.forEach(
      (record) => (users = users.concat(record.get('followedUser').properties)),
    );
    let retUsers = new UsersDto();
    retUsers.users = users;
    return retUsers;
  }

  async allFollowers(username) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {username: $username}) <- [f:FOLLOWS] - (followerUser:User)
          RETURN followerUser
      `,
      {
        username,
      },
    );
    let users = [];
    res.records.forEach(
      (record) => (users = users.concat(record.get('followerUser').properties)),
    );
    let retUsers = new UsersDto();
    retUsers.users = users;
    return retUsers;
  }

  async allFollowingRequests(username) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {username: $username}) - [rtf:REQUESTS_TO_FOLLOW] -> (followingReqUser:User)
          RETURN followingReqUser
      `,
      {
        username,
      },
    );
    let users = [];
    res.records.forEach(
      (record) =>
        (users = users.concat(record.get('followingReqUser').properties)),
    );
    let retUsers = new UsersDto();
    retUsers.users = users;
    return retUsers;
  }

  async allFollowerRequests(username) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {username: $username}) <- [rtf:REQUESTS_TO_FOLLOW] - (followerReqUser:User)
          RETURN followerReqUser
      `,
      {
        username,
      },
    );
    let users = [];
    res.records.forEach(
      (record) =>
        (users = users.concat(record.get('followerReqUser').properties)),
    );
    let retUsers = new UsersDto();
    retUsers.users = users;
    return retUsers;
  }

  async block(usernameToBlock, username) {
    const res = await this.neo4jService.write(
      `
      MATCH (userToBlock:User {username: $usernameToBlock})
      MATCH (loggedInUser:User {username: $username})

      MERGE (loggedInUser)-[b:BLOCKS]->(userToBlock)
      ON CREATE SET b.createdAt = datetime()

      RETURN userToBlock
      `,
      {
        usernameToBlock,
        username,
      },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    return new User(row.get('userToBlock')).toJson();
  }

  async unblock(usernameToUnblock, username) {
    const res = await this.neo4jService.write(
      `
      
      MATCH (loggedInUser:User {username: $username})-[b:BLOCKS]-
      (userToUnblock:User {username: $usernameToUnblock})

      DELETE b

      RETURN userToUnblock
      `,
      {
        usernameToUnblock,
        username,
      },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    return new User(row.get('userToUnblock')).toJson();
  }

  async allBlockedUsers(username) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {username: $username}) - [b:BLOCKS] -> (blockedUser:User)
          RETURN blockedUser
      `,
      {
        username,
      },
    );
    let users = [];
    res.records.forEach(
      (record) => (users = users.concat(record.get('blockedUser').properties)),
    );
    let retUsers = new UsersDto();
    retUsers.users = users;
    return retUsers;
  }

  async allBlockedByUsers(username) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {username: $username}) <- [b:BLOCKS] - (blockingUser:User)
          RETURN blockingUser
      `,
      {
        username,
      },
    );
    let users = [];
    res.records.forEach(
      (record) => (users = users.concat(record.get('blockingUser').properties)),
    );
    let retUsers = new UsersDto();
    retUsers.users = users;
    return retUsers;
  }
}

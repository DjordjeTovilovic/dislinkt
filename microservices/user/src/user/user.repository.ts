import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { Education } from './entity/education.entity';
import { Experiences } from './entity/experiences.entity';
import { Interests } from './entity/interests.entity';
import { Skills } from './entity/skills.entity';
import { User } from './entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

  async findById(id) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {id: $id})
          RETURN u
      `,
      {
        id,
      },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    return new User(row.get('u')).toJson();
  }

  async findByUsername(username) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {username: $username})
          RETURN u
      `,
      {
        username,
      },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    return new User(row.get('u')).toJson();
  }

  async follow(usernameToFollow, username) {
    const res = await this.neo4jService.write(
      `
      MATCH (userToFollow:User {username: $usernameToFollow})
      MATCH (loggedInUser:User {username: $username})

      MERGE (loggedInUser)-[f:FOLLOWS]->(userToFollow)
      ON CREATE SET f.createdAt = datetime()

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

  async create(user: CreateUserDto) {
    const res = await this.neo4jService.write(
      `
        CREATE (u:User {
            id: randomUUID(),
            username: $username,
            password: $password,
            email: $email,
            bio: $bio,
            image: $image,
            gender: $gender,
            phoneNumber: $phoneNumber,
            birthday: $birthday,
            privateProfile: $privateProfile
        })

        RETURN u
      `,
      {
        username: user.username,
        password: user.password,
        email: user.email,
        bio: user.bio,
        image: user.image,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday,
        privateProfile: user.privateProfile,
      },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    const u = new User(row.get('u'));
    u.experiences = await this.addExperiences(user);
    u.education = await this.addEducation(user);
    u.skills = await this.addSkills(user);
    u.interests = await this.addInterests(user);
    return u.toJson();
  }

  async update(updateUserDto) {
    console.log(updateUserDto);

    const res = await this.neo4jService.write(
      `
        MATCH (u:User {id: $id})
        SET u.updatedAt = localdatetime(), u += $updateUserDto
        RETURN u
    `,
      { id: updateUserDto.id, updateUserDto },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    console.log(row.get('u'));

    return new User(row.get('u')).toJson();
  }

  async addExperiences(user) {
    const userExperience = new Experiences();
    for (const experience of user.experiences) {
      const res = await this.neo4jService.write(
        `
          MATCH (u:User {username: $username})

          CREATE (e:Experiences {
            id: randomUUID(),
            position: $position,
            company: $company,
            description: $description,
            startDate: $startDate,
            endDate: $endDate
          })

          MERGE (u)-[a:WORKED]->(e)
        
          RETURN e
          `,
        {
          username: user.username,
          position: experience.position,
          company: experience.company,
          description: experience.description,
          startDate: experience.startDate,
          endDate: experience.endDate,
        },
      );

      const row = res.records[0];
      userExperience.add(row.get('e'));
    }
    return userExperience;
  }

  async addEducation(user) {
    const userEducation = new Education();
    for (const edu of user.education) {
      const res = await this.neo4jService.write(
        `
          MATCH (u:User {username: $username})

          CREATE (e:Education {
            id: randomUUID(),
            institution: $institution,
            description: $description,
            startDate: $startDate,
            endDate: $endDate
          })

          MERGE (u)-[a:ATTENDED]->(e)
        
          RETURN e
          `,
        {
          username: user.username,
          institution: edu.institution,
          description: edu.description,
          startDate: edu.startDate,
          endDate: edu.endDate,
        },
      );

      const row = res.records[0];
      userEducation.add(row.get('e'));
    }
    return userEducation;
  }

  async addSkills(user) {
    const userSkills = new Skills();
    for (const skill of user.skills) {
      const res = await this.neo4jService.write(
        `
          MATCH (u:User {username: $username})

          CREATE (s:Skill {
            id: randomUUID(),
            name: $name
          })

          MERGE (u)-[a:HAS]->(s)
        
          RETURN s
          `,
        {
          username: user.username,
          name: skill.name,
        },
      );

      const row = res.records[0];
      userSkills.add(row.get('s'));
    }
    return userSkills;
  }

  async addInterests(user) {
    const userInterests = new Interests();
    for (const interest of user.interests) {
      const res = await this.neo4jService.write(
        `
          MATCH (u:User {username: $username})

          CREATE (i:Interest {
            id: randomUUID(),
            name: $name
          })

          MERGE (u)-[a:INTERESTED_IN]->(s)
        
          RETURN i
          `,
        {
          username: user.username,
          name: interest.name,
        },
      );

      const row = res.records[0];
      userInterests.add(row.get('i'));
    }
    return userInterests;
  }
}

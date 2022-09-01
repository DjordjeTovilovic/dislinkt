import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateUserDto } from './dto/create-user.dto';
import {
  EducationsDto,
  ExperiencesDto,
  InterestsDto,
  SkillsDto,
} from './dto/other.dto';
import { UsersDto } from './dto/users.dto';
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

  async deleteByUsername(username) {
    const res = await this.neo4jService.write(
      `
          MATCH (u:User {username: $username})
          SET u.deletedAt = localdatetime()
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

  async restoreDeleteById(userId) {
    const res = await this.neo4jService.write(
      `
          MATCH (u:User {id: $userId})
          REMOVE u.deletedAt
          RETURN u
      `,
      {
        userId,
      },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    return new User(row.get('u')).toJson();
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
    u.education = await this.addEducations(user);
    u.skills = await this.addSkills(user);
    u.interests = await this.addInterests(user);
    return u.toJson();
  }

  async update(updateUserDto) {
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

    return new User(row.get('u')).toJson();
  }

  async recommendThroughMutualProfiles(skipNumber, username) {
    let res;
    if (skipNumber === 0)
      res = await this.neo4jService.read(
        `
          MATCH (loggedInUser:User {username: $username})-[:FOLLOWS]->(commonUser:User)<-[:FOLLOWS]-(recommendedUser:User)
          WHERE not (loggedInUser)-[:FOLLOWS]->(recommendedUser)
          RETURN recommendedUser, count(commonUser)
          ORDER BY count(commonUser) desc
          LIMIT 10
        `,
        {
          skipNumber,
          username,
        },
      );
    else
      res = await this.neo4jService.read(
        `
          MATCH (u:User {username: $username})-[:FOLLOWS]->(commonUser:User)<-[:FOLLOWS]-(recommendedUser:User)
          WHERE not (loggedInUser)-[:FOLLOWS]->(recommendedUser)
          RETURN recommendedUser, count(commonUser)
          ORDER BY count(commonUser)
          SKIP $skipNumber
          LIMIT 10
      `,
        {
          skipNumber,
          username,
        },
      );
    let users = [];
    res.records.forEach(
      (record) =>
        (users = users.concat(record.get('recommendedUser').properties)),
    );
    const retUsers = new UsersDto();
    retUsers.users = users;
    return retUsers;
  }

  async recommendThroughSkills(skipNumber, username) {
    let res;
    if (skipNumber === 0)
      res = await this.neo4jService.read(
        `
          MATCH (loggedInUser:User {username: $username})-[:HAS_SKILL]->(commonSkill:Skill)<-[:HAS_SKILL]-(recommendedUser:User)
          WHERE not (loggedInUser)-[:FOLLOWS]->(recommendedUser)
          RETURN recommendedUser, count(commonSkill)
          ORDER BY count(commonSkill) desc
          LIMIT 10
        `,
        {
          skipNumber,
          username,
        },
      );
    else
      res = await this.neo4jService.read(
        `
          MATCH (u:User {username: $username})-[:HAS_SKILL]->(commonSkill:Skill)<-[:HAS_SKILL]-(recommendedUser:User)
          WHERE not (loggedInUser)-[:FOLLOWS]->(recommendedUser)
          RETURN recommendedUser, count(commonSkill)
          ORDER BY count(commonSkill)
          SKIP $skipNumber
          LIMIT 10
      `,
        {
          skipNumber,
          username,
        },
      );
    let users = [];
    res.records.forEach(
      (record) =>
        (users = users.concat(record.get('recommendedUser').properties)),
    );
    const retUsers = new UsersDto();
    retUsers.users = users;
    return retUsers;
  }

  async recommendThroughInterests(skipNumber, username) {
    let res;
    if (skipNumber === 0)
      res = await this.neo4jService.read(
        `
          MATCH (loggedInUser:User {username: $username})-[:INTERESTED_IN]->(commonInterest:Interest)<-[:INTERESTED_IN]-(recommendedUser:User)
          WHERE not (loggedInUser)-[:FOLLOWS]->(recommendedUser)
          RETURN recommendedUser, count(commonInterest)
          ORDER BY count(commonInterest) desc
          LIMIT 10
        `,
        {
          skipNumber,
          username,
        },
      );
    else
      res = await this.neo4jService.read(
        `
          MATCH (u:User {username: $username})-[:INTERESTED_IN]->(commonInterest:Interest)<-[:INTERESTED_IN]-(recommendedUser:User)
          WHERE not (loggedInUser)-[:FOLLOWS]->(recommendedUser)
          RETURN recommendedUser, count(commonInterest)
          ORDER BY count(commonInterest)
          SKIP $skipNumber
          LIMIT 10
      `,
        {
          skipNumber,
          username,
        },
      );
    let users = [];
    res.records.forEach(
      (record) =>
        (users = users.concat(record.get('recommendedUser').properties)),
    );
    const retUsers = new UsersDto();
    retUsers.users = users;
    return retUsers;
  }

  async recommendThroughEducation(skipNumber, username) {
    let res;
    if (skipNumber === 0)
      res = await this.neo4jService.read(
        `
          MATCH (loggedInUser:User {username: $username})-[:ATTENDED]->(commonInstitution:Education)<-[:ATTENDED]-(recommendedUser:User)
          WHERE not (loggedInUser)-[:FOLLOWS]->(recommendedUser)
          RETURN recommendedUser, count(commonInstitution)
          ORDER BY count(commonInstitution) desc
          LIMIT 10
        `,
        {
          skipNumber,
          username,
        },
      );
    else
      res = await this.neo4jService.read(
        `
          MATCH (u:User {username: $username})-[:ATTENDED]->(commonInstitution:Education)<-[:ATTENDED]-(recommendedUser:User)
          WHERE not (loggedInUser)-[:FOLLOWS]->(recommendedUser)
          RETURN recommendedUser, count(commonInstitution)
          ORDER BY count(commonInstitution)
          SKIP $skipNumber
          LIMIT 10
      `,
        {
          skipNumber,
          username,
        },
      );
    let users = [];
    res.records.forEach(
      (record) =>
        (users = users.concat(record.get('recommendedUser').properties)),
    );
    const retUsers = new UsersDto();
    retUsers.users = users;
    return retUsers;
  }

  async recommendThroughExperience(skipNumber, username) {
    let res;
    if (skipNumber === 0)
      res = await this.neo4jService.read(
        `
          MATCH (loggedInUser:User {username: $username})-[:WORKED]->(commonCompany:Experience)<-[:WORKED]-(recommendedUser:User)
          WHERE not (loggedInUser)-[:FOLLOWS]->(recommendedUser) AND loggedInUser.username <> recommendedUser.username
          RETURN recommendedUser, count(commonCompany)
          ORDER BY count(commonCompany) desc
          LIMIT 10
        `,
        {
          skipNumber,
          username,
        },
      );
    else
      res = await this.neo4jService.read(
        `
          MATCH (u:User {username: $username})-[:WORKED]->(commonCompany:Experience)<-[:WORKED]-(recommendedUser:User)
          WHERE not (loggedInUser)-[:FOLLOWS]->(recommendedUser)
          RETURN recommendedUser, count(commonCompany)
          ORDER BY count(commonCompany)
          SKIP $skipNumber
          LIMIT 10
      `,
        {
          skipNumber,
          username,
        },
      );
    let users = [];
    res.records.forEach(
      (record) =>
        (users = users.concat(record.get('recommendedUser').properties)),
    );
    const retUsers = new UsersDto();
    retUsers.users = users;
    return retUsers;
  }

  async addExperiences(user) {
    const userExperience = new Experiences();
    let res;
    for (const exp of user.experience) {
      const exists = await this.neo4jService.read(
        `
        MATCH (e:Experience)
        WHERE toLower(e.company) = toLower($company)
        RETURN e
        `,
        {
          company: exp.company,
        },
      );
      if (exists.records.length > 0)
        res = await this.neo4jService.write(
          `
            MATCH (u:User {username: $username})
            MATCH (e:Experience)
            WHERE toLower(e.company) = toLower($company)
            MERGE (u)-[w:WORKED{
                position: $position,
                description: $description,
                startDate: $startDate,
                endDate: $endDate
              }]->(e)
            RETURN e
          `,
          {
            username: user.username,
            company: exp.company,
            position: exp.position,
            description: exp.description,
            startDate: exp.startDate,
            endDate: exp.endDate,
          },
        );
      else
        res = await this.neo4jService.write(
          `
            MATCH (u:User {username: $username})
            CREATE (e:Experience {
              id: randomUUID(),
              company: $company
            })
            MERGE (u)-[w:WORKED{
              position: $position,
              description: $description,
              startDate: $startDate,
              endDate: $endDate
            }]->(e)
            RETURN e
            `,
          {
            username: user.username,
            company: exp.company,
            position: exp.position,
            description: exp.description,
            startDate: exp.startDate,
            endDate: exp.endDate,
          },
        );
      const row = res.records[0];
      userExperience.add(row.get('e'));
    }
    return userExperience;
  }

  async removeExperiences(user) {
    const userExperience = new Experiences();
    for (const exp of user.experience) {
      const res = await this.neo4jService.write(
        `
          MATCH (u:User {username: $username})-
          [w:WORKED{
            position: $position,
            description: $description,
            startDate: $startDate,
            endDate: $endDate}]-
            (e:Experience {
              company: $company
            })

          DELETE w
        
          RETURN e
          `,
        {
          username: user.username,
          company: exp.company,
          position: exp.position,
          description: exp.description,
          startDate: exp.startDate,
          endDate: exp.endDate,
        },
      );
    }
    return userExperience;
  }

  async addEducations(user) {
    const userEducation = new Education();
    let res;
    for (const edu of user.education) {
      const exists = await this.neo4jService.read(
        `
        MATCH (e:Education )
        WHERE toLower(e.institution) = toLower($institution)
        RETURN e
        `,
        {
          institution: edu.institution,
        },
      );
      if (exists.records.length > 0)
        res = await this.neo4jService.write(
          `
            MATCH (u:User {username: $username})
            MATCH (e:Education)
            WHERE toLower(e.institution) = toLower($institution)
            MERGE (u)-[a:ATTENDED{
                description: $description,
                startDate: $startDate,
                endDate: $endDate
              }]->(e)
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
      else
        res = await this.neo4jService.write(
          `
            MATCH (u:User {username: $username})
            CREATE (e:Education {
              id: randomUUID(),
              institution: $institution
            })
            MERGE (u)-[a:ATTENDED{
              description: $description,
              startDate: $startDate,
              endDate: $endDate
            }]->(e)
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

  async removeEducations(user) {
    const userEducation = new Education();
    for (const edu of user.education) {
      const res = await this.neo4jService.write(
        `
          MATCH (u:User {username: $username})-
          [a:ATTENDED{
            description: $description,
            startDate: $startDate,
            endDate: $endDate}]-
            (e:Education {
              institution: $institution
            })

          DELETE a
        
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
    }
    return userEducation;
  }

  async addSkills(user) {
    const userSkill = new Skills();
    let res;
    for (const skill of user.skills) {
      const exists = await this.neo4jService.read(
        `
        MATCH (s:Skill)
        WHERE toLower(s.name) = toLower($name)
        RETURN s
        `,
        {
          name: skill.name,
        },
      );
      if (exists.records.length > 0)
        res = await this.neo4jService.write(
          `
            MATCH (u:User {username: $username})
            MATCH (s:Skill)
            WHERE toLower(s.name) = toLower($name)
            MERGE (u)-[hs:HAS_SKILL]->(s)
            RETURN s
          `,
          {
            username: user.username,
            name: skill.name,
          },
        );
      else
        res = await this.neo4jService.write(
          `
            MATCH (u:User {username: $username})
            CREATE (s:Skill {
              id: randomUUID(),
              name: $name
            })
            MERGE (u)-[hs:HAS_SKILL]->(s)
            RETURN s
            `,
          {
            username: user.username,
            name: skill.name,
          },
        );
      const row = res.records[0];
      userSkill.add(row.get('s'));
    }
    return userSkill;
  }

  async removeSkills(user) {
    const userSkill = new Skills();
    for (const skill of user.skills) {
      const res = await this.neo4jService.write(
        `
          MATCH (u:User {username: $username})-[hs:HAS_SKILL]-(s:Skill {name: $name})
          DELETE hs
        
          RETURN s
          `,
        {
          username: user.username,
          name: skill.name,
        },
      );
    }
    return userSkill;
  }

  async addInterests(user) {
    const userInterest = new Interests();
    let res;
    for (const interest of user.interests) {
      const exists = await this.neo4jService.read(
        `
        MATCH (i:Interest )
        WHERE toLower(i.name) = toLower($name)
        RETURN i
        `,
        {
          name: interest.name,
        },
      );
      if (exists.records.length > 0)
        res = await this.neo4jService.write(
          `
            MATCH (u:User {username: $username})
            MATCH (i:Interest)
            WHERE toLower(i.name) = toLower($name)
            MERGE (u)-[ii:INTERESTED_IN]->(i)
            RETURN i
          `,
          {
            username: user.username,
            name: interest.name,
          },
        );
      else
        res = await this.neo4jService.write(
          `
            MATCH (u:User {username: $username})
            CREATE (i:Interest {
              id: randomUUID(),
              name: $name
            })
            MERGE (u)-[ii:INTERESTED_IN]->(i)
            RETURN i
            `,
          {
            username: user.username,
            name: interest.name,
          },
        );
      const row = res.records[0];
      userInterest.add(row.get('i'));
    }
    return userInterest;
  }

  async removeInterests(user) {
    const userInterest = new Interests();
    for (const interest of user.interests) {
      const res = await this.neo4jService.write(
        `
          MATCH (u:User {username: $username})-[ii:INTERESTED_IN]-(i:Interest {name: $name})
          DELETE ii
        
          RETURN i
          `,
        {
          username: user.username,
          name: interest.name,
        },
      );
    }
    return userInterest;
  }

  async getSkillsForUser(userId) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {id: $userId})-[:HAS_SKILL]->(s:Skill)
          RETURN s
      `,
      {
        userId: userId,
      },
    );
    let skills = [];
    res.records.forEach(
      (record) => (skills = skills.concat(record.get('s').properties)),
    );
    const retSkills = new SkillsDto();
    retSkills.skills = skills.length > 0 ? skills : [];
    return retSkills;
  }

  async getEducationsForUser(userId) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {id: $userId})-[a:ATTENDED]->(e:Education)
          RETURN a,e
      `,
      {
        userId: userId,
      },
    );
    let educations = [];
    res.records.forEach(
      (record) =>
        (educations = educations.concat({
          ...record.get('a').properties,
          ...record.get('e').properties,
        })),
    );
    const retEducations = new EducationsDto();
    retEducations.educations = educations.length > 0 ? educations : [];
    return retEducations;
  }

  async getInterestsForUser(userId) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {id: $userId})-[:INTERESTED_IN]->(i:Interest)
          RETURN i
      `,
      {
        userId: userId,
      },
    );
    let interests = [];
    res.records.forEach(
      (record) => (interests = interests.concat(record.get('i').properties)),
    );
    const retInterests = new InterestsDto();
    retInterests.interests = interests.length > 0 ? interests : [];
    return retInterests;
  }
  async getExperiencesForUser(userId) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {id: $userId})-[w:WORKED]->(e:Experience)
          RETURN w,e
      `,
      {
        userId: userId,
      },
    );
    let experiences = [];
    res.records.forEach(
      (record) =>
        (experiences = experiences.concat({
          ...record.get('w').properties,
          ...record.get('e').properties,
        })),
    );
    console.log(experiences);
    const retExperiences = new ExperiencesDto();
    retExperiences.experiences = experiences.length > 0 ? experiences : [];
    return retExperiences;
  }
}

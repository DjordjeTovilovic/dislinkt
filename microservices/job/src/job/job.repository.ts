import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { JobProto, JobsProto } from 'src/protos/job.pb';

@Injectable()
export class JobRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

  async findAll() {
    const res = await this.neo4jService.read(
      `

      `,
    );
  }

  async addJob(job) {
    let res = await this.neo4jService.write(
      `
        CREATE (j:Job {
          id: randomUUID(),
          position: $position,
          seniority: $seniority,
          description: $description
        })

        RETURN j
    `,
      {
        position: job.position,
        seniority: job.seniority,
        description: job.description,
      },
    );
    let newJob: JobProto = res.records[0].get('j').properties;
    job.skillsRequired.forEach(async (skill) => {
      const exists = await this.neo4jService.read(
        `
        MATCH (s:Skill)
        WHERE toLower(s.name) = toLower($skill)
        RETURN s
        `,
        {
          skill: skill,
        },
      );
      if (exists.records.length > 0)
        await this.neo4jService.write(
          `
          MATCH (j:Job {id: $id})
          MATCH (s:Skill)
          WHERE toLower(s.name) = toLower($skill)
          MERGE (j)-[rq:REQUIRES_SKILL]->(s)
          `,
          {
            id: newJob.id,
            skill: skill,
          },
        );
      else
        await this.neo4jService.write(
          `
          MATCH (j:Job {id: $id})
          CREATE (s:Skill {id: randomUUID(), name: $skill })
          MERGE (j)-[rq:REQUIRES_SKILL]->(s)
      `,
          {
            id: newJob.id,
            skill: skill,
          },
        );
    });
    const exists = await this.neo4jService.read(
      `
      MATCH (e:Experience)
      WHERE toLower(e.name) = toLower($company)
      RETURN e
      `,
      {
        company: job.company,
      },
    );
    if (exists.records.length > 0)
      await this.neo4jService.write(
        `
        MATCH (j:Job {id: $id})
        MATCH (e:Experience)
        WHERE toLower(e.name) = toLower($company)
        MERGE (e)-[o:OFFERS]->(j)
        `,
        {
          id: newJob.id,
          company: job.company,
        },
      );
    else
      await this.neo4jService.write(
        `
        MATCH (j:Job {id: $id})
        CREATE (e:Experience {id: randomUUID(), name: $company })
        MERGE (e)-[o:OFFERS]->(j)
        `,
        {
          id: newJob.id,
          company: job.company,
        },
      );
    await this.neo4jService.write(
      `
        MATCH (u:User {id: $userId})
        MATCH (e:Experience)
        WHERE toLower(e.name) = toLower($company)
        MERGE (u)-[o:OWNS]->(e)
        `,
      {
        userId: job.userId,
        company: job.company,
      },
    );
    return newJob;
  }

  async recommendedJobOffers(username) {
    const res = await this.neo4jService.read(
      `
          MATCH (u:User {username: $username})-[:HAS_SKILL]->(commonSkill:Skill)<-[:REQUIRES_SKILL]-(recommendedJob:Job)
          MATCH (skill:Skill)<-[:REQUIRES_SKILL]-(recommendedJob:Job)
          RETURN recommendedJob, count(commonSkill)
          ORDER BY count(commonSkill) desc
      `,
      {
        username,
      },
    );
    const jobs = res.records.map((record) => {
      return record.get('recommendedJob').properties;
    });
    return { jobs: jobs };
  }
}

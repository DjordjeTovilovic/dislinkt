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
          description: $description,
          postedBy: $postedBy
        })

        RETURN j
    `,
      {
        position: job.position,
        seniority: job.seniority,
        description: job.description,
        postedBy: job.postedBy,
      },
    );
    let newJob: JobProto = res.records[0].get('j').properties;
    job.requiredSkills.forEach(async (skill) => {
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
        this.neo4jService.write(
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
        this.neo4jService.write(
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

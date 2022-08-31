import { Node } from 'neo4j-driver';
import { JobDto } from '../dto/job.dto';

export class Job {
  constructor(private readonly node: Node) {}

  skills: string[];

  toJson(): JobDto {
    const { id, position, seniority, description, company } =
      this.node.properties;

    return {
      id,
      position,
      seniority,
      description,
      company,
      skillsRequired: [...this.skills],
    };
  }
}

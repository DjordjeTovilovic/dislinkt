import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class JobRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

  async findAll() {
    const res = await this.neo4jService.read(
      `

      `,
    );
  }
}

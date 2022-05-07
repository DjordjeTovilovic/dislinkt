import { Module, OnModuleInit } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Neo4jService } from 'nest-neo4j/dist';
import { PostRepository } from './post.repository';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule implements OnModuleInit {
  constructor(private readonly neo4jService: Neo4jService) {}

  async onModuleInit() {
    await this.neo4jService
      .write('CREATE CONSTRAINT ON (p:Post) ASSERT p.id IS UNIQUE')
      .catch(() => {});
  }
}

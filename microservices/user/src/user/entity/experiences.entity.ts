import { Node } from 'neo4j-driver';
import { ExperienceProto } from '../../protos/user.pb';

export class Experiences {
  experiencesList: Node[] = [];

  add(element) {
    this.experiencesList.push(element);
  }

  toJson() {
    const experiencesListJson: ExperienceProto[] = [];
    this.experiencesList.forEach((experiences) => {
      const { id, position, company, description, startDate, endDate } =
        experiences.properties;
      experiencesListJson.push({
        id,
        position,
        company,
        description,
        startDate,
        endDate,
      });
    });

    return experiencesListJson;
  }
}

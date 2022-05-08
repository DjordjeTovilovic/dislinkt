import { Node } from 'neo4j-driver';
import { SkillProto } from '../../protos/user.pb';

export class Skills {
  skillsList: Node[] = [];

  add(element) {
    this.skillsList.push(element);
  }

  toJson() {
    const skillsListJson: SkillProto[] = [];
    this.skillsList.forEach((skills) => {
      const { id, name } = skills.properties;
      skillsListJson.push({
        id,
        name,
      });
    });

    return skillsListJson;
  }
}

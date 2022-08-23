import { Relationship } from 'neo4j-driver';
import { WorkedProto } from 'src/protos/user.pb';

export class Worked {
  workedList: Relationship[] = [];

  add(element) {
    this.workedList.push(element);
  }

  toJson() {
    const workedListJson: WorkedProto[] = [];
    this.workedList.forEach((worked) => {
      const { id, description, position, startDate, endDate } =
        worked.properties;
      workedListJson.push({
        id,
        position,
        description,
        startDate,
        endDate,
      });
    });

    return workedListJson;
  }
}

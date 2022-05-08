import { Node } from 'neo4j-driver';
import { InterestProto } from '../../protos/user.pb';

export class Interests {
  interestsList: Node[] = [];

  add(element) {
    this.interestsList.push(element);
  }

  toJson() {
    const interestsListJson: InterestProto[] = [];
    this.interestsList.forEach((interests) => {
      const { id, name } = interests.properties;
      interestsListJson.push({
        id,
        name,
      });
    });

    return interestsListJson;
  }
}

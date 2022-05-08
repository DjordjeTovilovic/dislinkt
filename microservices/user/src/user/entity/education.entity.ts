import { Node } from 'neo4j-driver';
import { EducationProto } from '../../protos/user.pb';

export class Education {
  educationList: Node[] = [];

  add(element) {
    this.educationList.push(element);
  }

  toJson() {
    const educationListJson: EducationProto[] = [];
    this.educationList.forEach((education) => {
      const { id, institution, description, startDate, endDate } =
        education.properties;
      educationListJson.push({
        id,
        institution,
        description,
        startDate,
        endDate,
      });
    });

    return educationListJson;
  }
}

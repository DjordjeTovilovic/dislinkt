import { Node } from 'neo4j-driver';
import { EducationProto } from '../../protos/user.pb';

export class Education {
  educationsList: Node[] = [];

  add(element) {
    this.educationsList.push(element);
  }

  toJson() {
    const educationsListJson: EducationProto[] = [];
    this.educationsList.forEach((educations) => {
      const { id, institution, description, startDate, endDate } =
        educations.properties;
      educationsListJson.push({
        id,
        institution,
        description,
        startDate,
        endDate,
      });
    });

    return educationsListJson;
  }
}

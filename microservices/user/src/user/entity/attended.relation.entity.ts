import { Relationship } from 'neo4j-driver';
import { AttendedProto } from 'src/protos/user.pb';

export class Attended {
  attendedsList: Relationship[] = [];

  add(element) {
    this.attendedsList.push(element);
  }

  toJson() {
    const attendedsListJson: AttendedProto[] = [];
    this.attendedsList.forEach((attendeds) => {
      const { id, description, startDate, endDate } = attendeds.properties;
      attendedsListJson.push({
        id,
        description,
        startDate,
        endDate,
      });
    });

    return attendedsListJson;
  }
}

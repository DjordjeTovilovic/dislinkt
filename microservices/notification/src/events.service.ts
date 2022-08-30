import { Injectable } from '@nestjs/common';
import { fromEvent } from 'rxjs';
import { EventEmitter } from 'events';

@Injectable()
export class EventsService {
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  subscribe(username: string) {
    console.log(`notificationReceived/${username}`);
    return fromEvent(this.emitter, `notificationReceived/${username}`);
  }

  async emit(data) {
    this.emitter.emit(`notificationReceived/${data.receiverUsername}`, {
      data,
    });
  }
}

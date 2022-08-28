import { Injectable } from '@nestjs/common';
import { fromEvent } from 'rxjs';
import { EventEmitter } from 'events';

@Injectable()
export class EventsService {
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  subscribe(userId: string) {
    console.log(`messageReceived/${userId}`);
    return fromEvent(this.emitter, `messageReceived/${userId}`);
  }

  async emit(data) {
    this.emitter.emit(`messageReceived/${data.senderId}`, { data });
    this.emitter.emit(`messageReceived/${data.receiverId}`, { data });
  }
}

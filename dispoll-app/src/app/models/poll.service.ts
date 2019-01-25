import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Poll } from './poll';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private socket: Socket) { }

  public newPoll(poll: Poll) {
    this.socket.emit('newPoll', poll);
  }
}

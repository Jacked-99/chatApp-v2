import { Injectable } from '@angular/core';
import { Message } from './shared/message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messagesList: Message[] = [
    { author: 'Jack', message: 'Hello', date: new Date(Date.now()) },
    { author: 'Not Jack', message: 'Hi', date: new Date(Date.now()) },
    { author: 'Not Jack', message: 'Welcome', date: new Date(Date.now()) },
  ];
  getMessages() {
    return this.messagesList.slice();
  }

  constructor() {}
}

import { Injectable } from '@angular/core';
import { Message } from './shared/message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  msgDisplayer = new Subject<Message[]>();
  messagesList: Message[] = [
    { author: 'Jack', message: 'Hello', date: new Date(Date.now()) },
    { author: 'Not Jack', message: 'Hi', date: new Date(Date.now()) },
    { author: 'Not Jack', message: 'Welcome', date: new Date(Date.now()) },
  ];
  getMessages() {
    this.msgDisplayer.next(this.messagesList.slice());
    return this.messagesList.slice();
  }
  addMsg(data: Message) {
    this.msgDisplayer.next((this.messagesList = [...this.messagesList, data]));
    console.log(this.messagesList);
  }

  constructor() {}
}

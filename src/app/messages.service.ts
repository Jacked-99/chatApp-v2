import { Injectable } from '@angular/core';
import { Message } from './shared/message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messagesList: Message[] = [
    { author: 'Jack', message: 'Hello', date: new Date(Date.now()) },
    { author: 'Not Jack', message: 'Hi', date: new Date(Date.now()) },
    { author: 'Not Jack', message: 'Welcome', date: new Date(Date.now()) },
  ];
  msgDisplayer = new BehaviorSubject<Message[] | []>(this.messagesList);

  getMessages() {
    this.msgDisplayer.next(this.messagesList.slice());
  }
  addMsg(data: Message) {
    this.msgDisplayer.next((this.messagesList = [...this.messagesList, data]));
    console.log(this.messagesList);
  }

  constructor() {}
}

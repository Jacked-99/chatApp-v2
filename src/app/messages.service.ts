import { Injectable } from '@angular/core';
import { Message } from './shared/message';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

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
  constructor(private http: HttpService) {}
  async getMessages() {
    this.msgDisplayer.next(this.messagesList.slice());
    return await this.http.fetchMsg();
  }
  addMsg(data: Message) {
    this.msgDisplayer.next((this.messagesList = [...this.messagesList, data]));
    this.http.sendMsg(data);
  }
}

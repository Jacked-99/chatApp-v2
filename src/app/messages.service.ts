import { Injectable } from '@angular/core';
import { Message } from './shared/message';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpService) {}
  async getMessages() {
    return await this.http.fetchMsg();
  }
  addMsg(data: Message) {
    this.http.sendMsg(data);
  }
}

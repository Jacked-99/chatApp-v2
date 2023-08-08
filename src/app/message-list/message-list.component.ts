import { Component, OnInit, OnDestroy } from '@angular/core';

import { Message } from '../shared/message';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit, OnDestroy {
  msgList: Message[];
  constructor(private messages: MessagesService) {}
  ngOnInit(): void {
    this.msgList = this.messages.getMessages();
  }
  ngOnDestroy(): void {}
}

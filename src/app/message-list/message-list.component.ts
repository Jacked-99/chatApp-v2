import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs';
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
    this.messages.msgDisplayer.subscribe({
      next: (messages) => {
        console.log('hello');
        this.msgList = messages;
      },
    });
  }
  ngOnDestroy(): void {}
}

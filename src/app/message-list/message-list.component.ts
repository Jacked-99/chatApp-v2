import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { Message } from '../shared/message';
import { MessagesService } from '../messages.service';
import { Database, object, ref } from '@angular/fire/database';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit, OnDestroy {
  private database = inject(Database);
  objectSub: Subscription;

  msgList: Message[];

  constructor(private messages: MessagesService) {}
  ngOnInit(): void {
    this.objectSub = object(ref(this.database, '/messages/')).subscribe({
      next: (data) => {
        const messages = [];
        for (let key in data.snapshot.val()) {
          messages.push(data.snapshot.val()[key]);
          this.msgList = messages;
        }
      },
    });
  }
  ngOnDestroy(): void {
    this.objectSub.unsubscribe();
  }
}

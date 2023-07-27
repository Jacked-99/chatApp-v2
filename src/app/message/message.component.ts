import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Message } from '../shared/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  showAuthor = false;
  @Input() message: Message;

  currentUser = '';
  constructor(private user: UserService) {}
  ngOnInit(): void {
    this.currentUser = this.user.user;
  }
  onShowAuthor() {
    this.showAuthor = !this.showAuthor;
  }
  onCheckAuthor() {
    console.log(this.message.author);
    if (this.message.author != this.currentUser) {
      return 'notCurrent';
    }
    return 'current';
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Message } from '../shared/message';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  showAuthor = false;
  @Input() message: Message;

  currentUser: User;
  constructor(private user: UserService) {}
  ngOnInit(): void {
    this.currentUser = this.user.auth.currentUser;
  }
  onShowAuthor() {
    this.showAuthor = !this.showAuthor;
  }
  onCheckAuthor() {
    if (this.message.author.name != this.currentUser['displayName']) {
      return 'notCurrent';
    }
    return 'current';
  }
}

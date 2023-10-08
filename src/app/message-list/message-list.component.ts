import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { Subscription, take } from 'rxjs';
import { Message } from '../shared/message';
import { MessagesService } from '../messages.service';
import { Database, object, ref } from '@angular/fire/database';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit, OnDestroy {
  @ViewChild('endPoint', { static: true }) EndPoint: ElementRef;
  @ViewChild('endPointButton', { static: true }) EndButton: ElementRef;
  private database = inject(Database);
  objectSub: Subscription;
  userSub: Subscription;

  msgList: Message[];
  userData: {};
  scrollDown() {
    const btnRef = this.EndButton.nativeElement;
    btnRef.click();
  }

  constructor(
    private messages: MessagesService,
    private router: Router,
    private http: HttpService,
    private user: UserService
  ) {}
  ngOnInit(): void {
    this.userSub = object(
      ref(this.database, '/users/' + this.user.auth.currentUser.uid)
    ).subscribe({
      next: (data) => {
        this.userData = data.snapshot.val();
      },
    });
    this.objectSub = object(ref(this.database, '/messages/')).subscribe({
      next: (data) => {
        const messages = [];
        for (let key in data.snapshot.val()) {
          messages.push(data.snapshot.val()[key]);
          this.msgList = messages;
        }
        this.scrollDown();
      },
    });
  }

  ngOnDestroy(): void {
    this.objectSub.unsubscribe();
    this.userSub.unsubscribe();
  }
  onLastClick() {
    const element = this.EndPoint.nativeElement;
    element.scrollIntoView({
      behavior: 'smooth',
    });
  }
}

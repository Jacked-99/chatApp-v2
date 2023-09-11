import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../messages.service';
import { Message } from '../shared/message';
import { UserService } from '../user.service';
import { pipe, take } from 'rxjs';
import { HttpService } from '../http.service';
import { Database, object, ref } from '@angular/fire/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-control',
  templateUrl: './chat-control.component.html',
  styleUrls: ['./chat-control.component.css'],
})
export class ChatControlComponent implements OnInit {
  @ViewChild('file', { static: true }) InputFile: ElementRef;
  user: any;
  msgForm: FormGroup;
  filePreview = false;
  fileUrl: string;
  dataBase = inject(Database);
  objectSub: Subscription;
  userName = '';
  photoUrl = '';
  constructor(
    private msgs: MessagesService,
    private authorService: UserService
  ) {}
  ngOnInit(): void {
    this.msgForm = new FormGroup({
      msg: new FormControl('', Validators.required),
    });
    if (
      this.authorService.auth.currentUser &&
      !this.authorService.auth.currentUser.displayName
    ) {
      this.objectSub = object(
        ref(this.dataBase, '/users/' + this.authorService.auth.currentUser.uid)
      )
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.userName = data.snapshot.val()['userName'];
            this.photoUrl = data.snapshot.val()['profileImg'];
            console.log(this.userName);
          },
        });
    } else {
      this.userName = this.authorService.auth.currentUser.displayName;
    }
  }
  onSubmit() {
    console.log(this.userName);
    const user = this.authorService.auth.currentUser;

    if (!this.msgForm.value['msg']) {
      return;
    }

    const data: Message = {
      author: {
        name: this.userName,
        photo: !user['photoURL'] ? this.photoUrl : user['photoURL'],
      },
      message: this.msgForm.value['msg'],
      date: new Date(Date.now()),
    };
    this.msgForm.reset();
    this.msgs.addMsg(data);
  }
  addEmoji(event) {
    console.log(event);
    const newText = this.msgForm.value['msg'] + event.emoji.native;
    this.msgForm.setValue({ msg: newText });
  }
  onFileClick() {
    let element = this.InputFile.nativeElement;
    element.click();
  }
  onChange(event) {
    this.fileUrl = URL.createObjectURL(event.target.files[0]);
    this.filePreview = true;
  }
  closePreview() {
    this.filePreview = false;
    this.InputFile.nativeElement.value = '';
  }
}

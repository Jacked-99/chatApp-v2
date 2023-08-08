import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../messages.service';
import { Message } from '../shared/message';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat-control',
  templateUrl: './chat-control.component.html',
  styleUrls: ['./chat-control.component.css'],
})
export class ChatControlComponent implements OnInit {
  msgForm: FormGroup;
  constructor(
    private msgs: MessagesService,
    private authorService: UserService
  ) {}
  ngOnInit(): void {
    this.msgForm = new FormGroup({
      msg: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    const data: Message = {
      author: this.authorService.user.userName,
      message: this.msgForm.value['msg'],
      date: new Date(Date.now()),
    };
    console.log(data);
    this.msgs.addMsg(data);
  }
}

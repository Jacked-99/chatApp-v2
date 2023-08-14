import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../messages.service';
import { Message } from '../shared/message';
import { UserService } from '../user.service';
import { take } from 'rxjs';

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
    const user = this.authorService.auth.currentUser;
    if (!this.msgForm.value['msg']) {
      return;
    }
    const data: Message = {
      author: { name: user['displayName'], photo: user['photoURL'] },
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

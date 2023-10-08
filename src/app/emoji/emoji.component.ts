import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css'],
})
export class EmojiComponent {
  @Output() newEmoji = new EventEmitter<string>();

  setPicker = false;

  emojiShow() {
    this.setPicker = !this.setPicker;
  }
  onEmojiClick(value: string) {
    this.newEmoji.emit(value);
  }
}

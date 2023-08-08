import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from './shared/message';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  fetchMsg() {
    this.http
      .get(
        'https://chatappv2-69c7c-default-rtdb.europe-west1.firebasedatabase.app/messages.json'
      )
      .subscribe({
        next: (mess) => {
          console.log(mess);
        },
      });
  }
  sendMsg(message: Message) {
    this.http.put(
      'https://chatappv2-69c7c-default-rtdb.europe-west1.firebasedatabase.app/messages.json',
      message
    );
  }
  autoFetch() {}
}

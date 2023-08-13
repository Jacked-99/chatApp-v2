import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';
import { Message } from './shared/message';
import {
  Database,
  ref,
  onValue,
  get,
  push,
  child,
  update,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  database = inject(Database);

  async fetchMsg() {
    return get(ref(this.database, '/messages/')).then((data) => {
      return data.val();
    });
  }
  sendMsg(message: Message) {
    update(
      ref(
        this.database,
        '/messages/' + push(child(ref(this.database), '/messages')).key
      ),
      message
    );
  }
  autoFetch() {}
}

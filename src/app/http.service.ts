import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';
import { Message } from './shared/message';
import {
  Database,
  ref,
  get,
  push,
  child,
  update,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  currentUsers = [];
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
  async getUsers() {
    return await get(ref(this.database, '/users/')).then((data) => {
      this.currentUsers = data.val();
    });
  }
  async getUserData(userData) {
    await get(ref(this.database, '/users/' + userData.id)).then((snapshot) => {
      if (snapshot.exists) {
        return snapshot.val();
      } else {
        return console.log('nope');
      }
    });
  }
  setUser(userData) {
    let key = userData.id;
    let data = { ...userData };
    console.log(data);

    update(ref(this.database, '/users/' + key), data);
  }
}

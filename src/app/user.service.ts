import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // userSubject = new Subject();
  user = '';

  setUser(user: string) {
    // this.userSubject.next(user);
    this.user = user;
  }
  logOut() {
    // this.userSubject.next('');
    this.user = '';
  }

  constructor() {}
}

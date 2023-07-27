import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSubject = new Subject();

  setUser(user: string) {
    this.userSubject.next(user);
  }
  logOut() {
    this.userSubject.next('');
  }

  constructor() {}
}

import { Injectable, inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, tap, pipe } from 'rxjs';
import { Auth, user, User } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserInterface } from './shared/user';

import { HttpClient } from '@angular/common/http';
import { Database, get, objectVal, update } from '@angular/fire/database';
import { ref } from 'firebase/database';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  auth: Auth = inject(Auth);
  aUser = user(this.auth);
  dataBase = inject(Database);

  constructor(
    private router: Router,
    private client: HttpClient,
    private http: HttpService
  ) {}

  getUser() {
    return this.aUser;
  }

  async GoogleSignIn() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    if (credential.user.emailVerified) {
      const data = {
        id: this.auth.currentUser.uid,
        userName: this.auth.currentUser.displayName,
        online: true,
        profileImg: this.auth.currentUser.photoURL,
      };
      this.http.setUser(data);
      this.router.navigate(['/']);
    }
  }
  async logOut() {
    const data = {
      id: this.auth.currentUser.uid,
      userName: this.auth.currentUser.displayName,
      online: false,
      profileImg: this.auth.currentUser.photoURL,
    };
    this.http.setUser(data);
    await this.auth.signOut().then(() => this.router.navigate(['/login']));
  }
}

import { Injectable, inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, tap, pipe } from 'rxjs';
import { Auth, user, User } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserInterface } from './shared/user';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  auth: Auth = inject(Auth);
  aUser = user(this.auth);

  constructor(private router: Router, private client: HttpClient) {}

  getUser() {
    return this.aUser;
  }

  async GoogleSignIn() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    if (credential.user.emailVerified) {
      this.router.navigate(['/']);
    }
  }
  async logOut() {
    await this.auth.signOut().then(() => this.router.navigate(['/login']));
  }
}

import { Injectable, inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, tap, pipe } from 'rxjs';
import { Auth, user, User } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserInterface } from './shared/user';
import { data } from 'autoprefixer';
import { UserModel } from './shared/user.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // userSubject = new Subject();
  auth: Auth = inject(Auth);
  aUser = user(this.auth);
  user: UserInterface | null = null;
  userSub = new BehaviorSubject<any>(null);
  constructor(private router: Router, private client: HttpClient) {}

  // singInWithEmail(){
  //   this.client.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCi9DkP4sHAV465Gu6hfQ4t_Gvicn9Mcg")

  // }
  getUser() {
    return this.aUser;
  }

  async GoogleSignIn() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    if (credential.user.emailVerified) {
      this.router.navigate(['/']);
      this.userSub.next(credential);
    }
  }
  async logOut() {
    this.userSub.next(null);
    await this.auth.signOut().then(() => this.router.navigate(['/login']));
  }
}

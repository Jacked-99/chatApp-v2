import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  user,
} from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Database } from '@angular/fire/database';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  auth: Auth = inject(Auth);
  aUser = user(this.auth);
  dataBase = inject(Database);

  constructor(private router: Router, private http: HttpService) {}

  getUser() {
    return this.aUser;
  }
  async CreateUser(data) {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );
    userCredential.user.displayName;
    if (userCredential.user) {
      const userData = {
        id: this.auth.currentUser.uid,
        userName: data.userName,
        online: true,
        profileImg:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png',
      };
      this.http.setUser(userData);
      this.router.navigate(['/']);
    }
  }
  async emailSignin(data) {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );
    if (userCredential.user) {
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

import { Inject, inject, Injectable } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserService } from '../user.service';
import { map, take } from 'rxjs';
import { Auth, authState, user } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const userS = inject(UserService);
  const auth = inject(Auth);
  const userAuth = user(auth);
  //  userAuth.pipe(take(1)).subscribe({next:(user)=>{
  //   console.log(user);
  //     const isAuth = !!user;
  //     console.log(isAuth);
  //     if (!isAuth) {
  //       return router.createUrlTree(['/login']);
  //     } else {
  //       return true;
  //     }
  // }})

  const router = inject(Router);

  return userS.userSub.pipe(
    take(1),
    map((user) => {
      console.log(user);
      const isAuth = !!user;
      console.log(isAuth);
      if (!isAuth) {
        return router.createUrlTree(['/login']);
      } else {
        return true;
      }
    })
  );
};

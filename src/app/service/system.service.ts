import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  loggedInUser: User = new User();
  displayName: string = '';

  constructor(private router: Router) { }

  checkLogin(): void {
    // check loggedInUser, if not logged in, forward to Login page
    // only call this method when ready for primetime
    if (!this.userLoggedIn()) {
      this.router.navigateByUrl('/user/login');
    }
  }

  userLoggedIn(): boolean {
    return (this.loggedInUser.id != 0);
  }
}

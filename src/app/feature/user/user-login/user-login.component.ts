import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLogin } from '../../../model/user-login';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';
import { User } from '../../../model/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit, OnDestroy{
  title: string = 'User-Login';
  userLogin: UserLogin = new UserLogin();
  message?: string = undefined;
  subscription!: Subscription;

  constructor(
    private userSvc: UserService,
    private sysSvc: SystemService,
    private router: Router
  ){}

  ngOnInit(): void {
        // do stuff here later
    // invalidate logged in user
    this.sysSvc.loggedInUser = new User();
    // default email and pwd on login form
    this.userLogin.email = 'snblessing@gmail.com';
    this.userLogin.password = 'sesame';
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login() {
    this.subscription = this.userSvc.login(this.userLogin).subscribe({
      next: (resp) => {
        this.sysSvc.loggedInUser = resp;
        this.sysSvc.displayName = this.sysSvc.loggedInUser.lastName + ', ' + this.sysSvc.loggedInUser.firstName;
        this.router.navigateByUrl('/welcome');
      },
      error: (err) => {
        this.message = 'Invalid email / pwd combination. Try again.';
      },
      complete: () => {
      },
    });
  }
}

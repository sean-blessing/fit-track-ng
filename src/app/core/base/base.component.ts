import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { SystemService } from '../../service/system.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent implements OnInit, OnDestroy {
  loggedInUser!: User;
  welcomeMessage: string = '';
  subscription?: Subscription;

  constructor(
    protected sysSvc: SystemService,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
  }

  userLoggedIn(): boolean {
    return this.loggedInUser != null && this.loggedInUser.id != 0;
  }

  checkLogin(): void {
    // check loggedInUser, if not logged in, forward to Login page
    // only call this method when ready for primetime
    if (!this.userLoggedIn()) {
      this.router.navigateByUrl('/user-login');
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }



}

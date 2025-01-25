import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { RouterLink } from '@angular/router';
import { SystemService } from '../../service/system.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  title: string = 'FitTrack'
  menuItems: MenuItem[] = [];
  welcomeMsg?: string = undefined;

  constructor(
    private sysSvc: SystemService
  ){}

  ngOnInit(): void {
    this.menuItems = [
      new MenuItem('Welcome', '/welcome', "Welcome Page")
    ];
    if (this.sysSvc.userLoggedIn()) {
      this.menuItems.push(
        new MenuItem('User', '/user-list', "User List"),
        new MenuItem('Week', '/week-list', "Week List"),
        new MenuItem('Activity', '/activity-list', "Activity List"),
        new MenuItem('Exercise', '/exercise-list', "Exercise List"),
        new MenuItem('Logout', '/user-login', "Login"),
      );
      this.welcomeMsg = 'Welcome, ' + this.sysSvc.loggedInUser.lastName + ", " + this.sysSvc.loggedInUser.firstName;
    }
    else {
      this.menuItems.push(new MenuItem('Login', '/user-login', "Login"));
    }
  }
}

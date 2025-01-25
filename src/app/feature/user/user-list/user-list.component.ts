import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { UserService } from '../../../service/user.service';
import { Router, RouterLink } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { User } from '../../../model/user';
import { MenuComponent } from "../../../core/menu/menu.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MenuComponent, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent extends BaseComponent implements OnInit {
  title: string = "User List";
  users: User[] = [];

  constructor(
    private userSvc: UserService,
    sysSvc: SystemService,
    router: Router
  ){
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    this.subscription = this.userSvc.list().subscribe( (resp)=> {
      this.users = resp;
    });
  }

  delete(id: number) {
    this.userSvc.delete(id).subscribe({
      next: (resp) => {
        if (resp == false) {
          console.log('UserListComponent - error deleting user');
        } else {
          // refresh users
          this.subscription = this.userSvc.list().subscribe((resp) => {
            this.users = resp;
          });
          this.router.navigateByUrl('/user-list');
        }
      },
      error: (err) => {
        console.log('Error deleting user: ' + err.message);
      },
      complete: () => {},
    });
  }
}

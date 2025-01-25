import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';
import { User } from '../../../model/user';
import { MenuComponent } from "../../../core/menu/menu.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [MenuComponent, FormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent extends BaseComponent implements OnInit, OnDestroy {
  title: string = 'User Create';
  user: User = new User();
  message?: string;

  constructor(private userSvc: UserService,
    sysSvc: SystemService,
    router: Router) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
  }

  save(): void {
    // NOTE: Check for existence of user email before save?
    this.userSvc.add(this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.log("Error creating user: " + err.message);
      },
      complete: () => { 
      }
    });
  }
}

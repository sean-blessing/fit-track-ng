import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { User } from '../../../model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { UserService } from '../../../service/user.service';
import { MenuComponent } from "../../../core/menu/menu.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [MenuComponent, FormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent extends BaseComponent implements OnInit, OnDestroy {
  title: string = 'User Edit';
  userId!: number;
  user!: User;

  constructor(
    private userSvc: UserService,
    sysSvc: SystemService,
    router: Router,
    private actRoute: ActivatedRoute
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
    this.actRoute.params.subscribe((parms) => {
      this.userId = parms['id'];
    });
    this.subscription = this.userSvc.getById(this.userId).subscribe({
      next: (resp) => {
        this.user = resp;
        console.log('user: ', this.user);
      },
      error: (err) => {
        console.log('Error retrieving user for id '+this.userId, err);
      }
    });
  }

  save(): void {
    // NOTE: Check for existence of user email before save?
    this.userSvc.edit(this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.log('Error updating user for id: ' + this.userId, err.message);
      },
      complete: () => {},
    });
  }

}

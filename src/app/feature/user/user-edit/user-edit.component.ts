import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { User } from '../../../model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { UserService } from '../../../service/user.service';
import { MenuComponent } from "../../../core/menu/menu.component";
import { FormsModule } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [MenuComponent, FormsModule, AsyncPipe],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent extends BaseComponent implements OnInit, OnDestroy {
  title: string = 'User Edit';
  user!: Observable<User>;

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
    this.user = this.actRoute.params.pipe(
      switchMap(params => this.userSvc.getById(params['id']))
    );
  }

  save(user: User): void {
    this.userSvc.edit(user).subscribe({
      next: () => this.router.navigateByUrl('/user-list'),
      error: (err) => console.error(err)
    });
  }

}

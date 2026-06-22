import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { BaseComponent } from '../../../core/base/base.component';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuComponent } from "../../../core/menu/menu.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MenuComponent, FormsModule, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent extends BaseComponent implements OnInit, OnDestroy{
  title: string = 'User Detail';
  userId!: number;
  user: User | null = null;

  constructor(
    private userSvc: UserService,
    sysSvc: SystemService,
    router: Router,
    private actRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ){
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
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error retrieving user for id '+this.userId, err);
      }
    });
  }
  
  delete() {
    this.userSvc.delete(this.userId).subscribe({
      next: (resp) => {
        if (resp == false) {
          ('UserDetailComponent - error deleting user');
        } else {
          this.router.navigateByUrl('user-list');
        }
      },
      error: (err) => {
        console.log('Error deleting user for id: '+this.userId, err.message);
      },
      complete: () => {},
    });
  }

}
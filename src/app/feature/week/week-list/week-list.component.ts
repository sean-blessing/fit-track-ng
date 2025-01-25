import { Component, OnDestroy, OnInit } from '@angular/core';
import { Week } from '../../../model/week';
import { Subscription } from 'rxjs';
import { WeekService } from '../../../service/week.service';
import { BaseComponent } from '../../../core/base/base.component';
import { SystemService } from '../../../service/system.service';
import { Router, RouterLink } from '@angular/router';
import { MenuComponent } from "../../../core/menu/menu.component";

@Component({
  selector: 'app-week-list',
  standalone: true,
  imports: [MenuComponent, RouterLink],
  templateUrl: './week-list.component.html',
  styleUrl: './week-list.component.css'
})
export class WeekListComponent extends BaseComponent implements OnInit, OnDestroy{
  title: string = 'Week List';
  weeks!: Week[];
  enabled: boolean = false;

  constructor(private weekSvc: WeekService,
              sysSvc: SystemService,
              router: Router
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
    this.subscription = this.weekSvc.list().subscribe((resp) => {
      this.weeks = resp;
    });
  }

  delete(id: number) {
    this.weekSvc.delete(id).subscribe({
      next: (resp) => {
        if (resp == false) {
          console.log('WeekListComponent - error deleting week');
        } else {
          this.router.navigateByUrl('/week-list');
        }
      },
      error: (err) => {
        console.log('Error deleting week: ' + err.message);
      },
      complete: () => {},
    });
  }
}

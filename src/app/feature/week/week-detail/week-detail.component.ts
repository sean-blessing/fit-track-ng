import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Week } from '../../../model/week';
import { SystemService } from '../../../service/system.service';
import { WeekService } from '../../../service/week.service';
import { MenuComponent } from "../../../core/menu/menu.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-week-detail',
  standalone: true,
  imports: [MenuComponent, FormsModule, RouterLink],
  templateUrl: './week-detail.component.html',
  styleUrl: './week-detail.component.css'
})
export class WeekDetailComponent extends BaseComponent implements OnInit, OnDestroy{
  title: string = 'Week Detail';
  weekId!: number;
  week!: Week;

  constructor(
    private weekSvc: WeekService,
    sysSvc: SystemService,
    router: Router,
    private actRoute: ActivatedRoute
  ){
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
    this.actRoute.params.subscribe((parms) => {
      this.weekId = parms['id'];
    });
    this.subscription = this.weekSvc.getById(this.weekId).subscribe({
      next: (resp) => {
        this.week = resp;
        console.log('week: ', this.week);
      },
      error: (err) => {
        console.log('Error retrieving week for id '+this.weekId, err);
      }
    });
  }
  
  delete() {
    this.weekSvc.delete(this.weekId).subscribe({
      next: (resp) => {
        if (resp == false) {
          ('WeekDetailComponent - error deleting week');
        } else {
          this.router.navigateByUrl('week-list');
        }
      },
      error: (err) => {
        console.log('Error deleting week for id: '+this.weekId, err.message);
      },
      complete: () => {},
    });
  }
}

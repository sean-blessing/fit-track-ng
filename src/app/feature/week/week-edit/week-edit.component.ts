import { Component, OnDestroy, OnInit } from '@angular/core';
import { Week } from '../../../model/week';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { WeekService } from '../../../service/week.service';
import { BaseComponent } from '../../../core/base/base.component';

@Component({
  selector: 'app-week-edit',
  standalone: true,
  imports: [],
  templateUrl: './week-edit.component.html',
  styleUrl: './week-edit.component.css'
})
export class WeekEditComponent extends BaseComponent implements OnInit, OnDestroy{
  title: string = 'Week Edit';
  weekId!: number;
  week!: Week;

  constructor(
    private weekSvc: WeekService,
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
      this.weekId = parms['id'];
    });
    this.subscription = this.weekSvc.getById(this.weekId).subscribe({
      next: (resp) => {
        this.week = resp;
      },
      error: (err) => {
        console.log('Error retrieving week for id '+this.weekId, err);
      }
    });
  }

  save(): void {
    // NOTE: Check for existence of week year+nbr before save?
    this.weekSvc.edit(this.week).subscribe({
      next: (resp) => {
        this.week = resp;
        this.router.navigateByUrl('/week-list');
      },
      error: (err) => {
        console.log('Error updating week for id: ' + this.weekId, err.message);
      },
      complete: () => {},
    });
  }
}
